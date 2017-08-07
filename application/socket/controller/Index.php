<?php
namespace app\socket\controller;
use think\worker\Server;
class Index extends Server{
	
	protected $socket  = 'websocket://0.0.0.0:2346';
	
	protected  $member = array();//连接池
	
	protected  $user   = array();//用户
	
	protected  $admin  = array();//管理
	
	protected  $kefu   = array();//客服
	
	/**
     * 收到信息
     * @param $connection
     * @param $data
     */
    public function onMessage($connection, $data)
    {
		$data = json_decode($data,true);
		
		date_default_timezone_set('Asia/Shanghai');//设置时区
		
		switch($data['msg']){
			
			case 'login':	
				
				$connection->id = $data['id'];//修改socket ID
				$this->saveMember($connection,$data);//刷新在线人数
				$this->allotKefu($connection);//分配客服
				$this->leadingEnd();//刷新会员在线列表
				break;
			case 'sendInfo':
				$data['time'] = date('Y-m-d H:i:s',time());
				//广播消息
				$this->sendMessage($connection,$data);
				break;
			case 'robot':	
				//广播消息
				$this->sendMessage($connection,$data);
				break;
			case 'audit':
				//审核过得发言
				$this->auditMessage($connection,$data);
				break;
			case 'delMsg':
				//删除不通过的发言
				$this->delMessage($data);
				break;
			case 'kefu':
				$this->kefuMessage($connection,$data);
				break;
			case 'jiancang':
				$this->jiancang($data);
				break;
		}
		
    }
	
	/**
     * 当连接断开时触发的回调函数
     * @param $connection
     */
    public function onClose($connection)
    {
		
		$this->del_link($connection);
		$this->leadingEnd();
		$this->peopleNumber();
    }

	
	/**
     * 当连接建立时触发的回调函数
     * @param $connection
     */
    public function onConnect($connection)
    {
		
    }
	
	/**
     * 当客户端的连接上发生错误时触发
     * @param $connection
     * @param $code
     * @param $msg
     */
    public function onError($connection, $code, $msg)
    {
        echo "error $code $msg\n";
    }


	/**
     * 每个进程启动
     * @param $worker
     */
    public function onWorkerStart($worker)
    {

    }

	
	
	//保存连接信息
	public function saveMember($connection,$data){
		
		$connection->info = $data;//保存用户信息
		
		//如果等级大于6级 则保存在管理员组
		if($data['level']>6){
			 
			if(!$this->in_arr($connection,'admin')){//检查当前连接是否在连接池
				array_push($this->admin,$connection);
			}
			
		}
		 
		//如果是客服 保存在客服组里
		if($data['kefu']==1){
			
			if(!$this->in_arr($connection,'kefu')){//检查当前连接是否在连接池
				array_push($this->kefu,$connection);
			}
			
		}
		 
		$member =  $this->in_arr($connection,'member');
		
		if(!$member){
			//array_push($this->member,$connection);
			$this->member[$data['id']] = $connection;
			
		}
		
		$this->peopleNumber();
	}
	
	
	//发送在线人数
	public function peopleNumber(){
		
		$num = count($this->member);
		foreach($this->admin as $v){
			$flag = $v->send('{"msg":"onlineNumber","num":"'.$num.'"}');
		}
		
	}
	
	
	//广播消息
	public function sendMessage($connection,$data){
		
		
		
		if($data['level']>6 || $data['msg']=='robot'){
			
			$data['msg'] = 'sendInfo';//更改消息类型
			
			$msg = json_encode($data);//组装成josn格式 发送
			
			foreach($this->member as $k=>$v){
				
				 if($v==$connection){
					 continue;
					 //如果是自己不操作消息
				 }else{
					 $v->send($msg);
				 }
			}
		}else{
			
			$data['msg'] = 'check';//更改消息类型
			
			$msg = json_encode($data);//组装成josn格式 发送
			
			foreach($this->admin as $v){
				
				$v->send($msg);

			}
		}
			
	}
	
	
	//广播审核通过的发言
	public function auditMessage($connection,$data){
		
		$data['msg'] = 'audit';
		
		$msg = json_encode($data);
		
		foreach($this->member as $v){
			
			if($this->in_arr($v,'admin')){//判断当前连接是否在admin连接池里
				
				$mess = json_decode($msg,true);
				$mess['msg']='audit_admin';
				$mess = json_encode($mess);
				$v->send($mess);
				continue;
				
			}else if($v->id==$data['uid']){//剔除这条信息的发言者
				
				continue;
				
			}else{
				
				$v->send($msg);
			}
			
		}
		
	}
	
	
	//广播删除审核不通过的发言
	public function delMessage($data){
			
		$msg = json_encode($data);
		
		foreach($this->admin as $v){
			
			$v->send($msg);
		}
		
	}
	
	
	//判断当前连接是否在连接池里
	public function in_arr($connection,$type){
		
		$flag = false;
		
		if($type=='admin'){
			
			foreach($this->admin as $v){
				if($v->id==$connection->id){
					$flag = true;
				}
			}
			
		}else if($type=='member'){
			
			foreach($this->member as $v){
				
				if($v->id==$connection->id){
					$flag = true;
				}
			}
			
		}else if($type=='kefu'){
			
			foreach($this->kefu as $v){
				
				if($v->id==$connection->id){
					$flag = true;
				}
			}
			
		}
		
		return $flag;
		
	}
	
	
	//删除断开的链接
	public function del_link($connection){
		
		foreach($this->member as $k=>$v){
			if($v->id==$connection->id){
				unset($this->member[$k]);
			}
		}
		
		foreach($this->admin as $k=>$v){
			if($v->id==$connection->id){
				unset($this->admin[$k]);
			}
		}
		
		foreach($this->kefu as $k=>$v){
			if($v->id==$connection->id){
				unset($this->kefu[$k]);
			}
		}
	}
	
	
	//分配客服
	public function allotKefu($connection){
		
		if(count($this->kefu)==0){
			
			$connection->send('{"msg":"kefu","status":"lixian"}');
			
		}else{
			
			$index = array_rand($this->kefu);
			$arr = $this->kefu[$index];
			$arr = $arr->info;
			$arr['msg'] = 'kefu';
			$arr['status']='allot';
			$arr = json_encode($arr);
			$connection->send($arr);
		}
	}
	
	
	//处理客服的消息
	public function kefuMessage($connection,$data){
		
		if(empty($this->member[$data['kid']])){
			
			$connection->send('{"msg":"kefu","status":"out"}');
			
		}else{
			$data['msg'] = 'kefu';
			$data['status']='ok';
			$this->member[$data['kid']]->send(json_encode($data));
		}
		
	}
	
	
	//刷新前段在线人数
	public function leadingEnd(){
		
		foreach($this->member as $k=>$v){
			
			$arr[$k] = $v->info;
			
		}
		
		$arr['msg'] = 'login';
		$arr = json_encode($arr);
		
		foreach($this->member as $v){
			
			$v->send($arr);
			
		}
		
	}
	
	
	//建仓
	public function jiancang($data){
		
		$data['time'] = date('Y-m-d H:i:s',time());
		$data = json_encode($data);
		foreach($this->member as $v){
			$v->send($data);
		}
		
	}
	
	
}