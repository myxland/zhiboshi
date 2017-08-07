<?php
namespace app\index\controller;

class Index extends \think\Controller
{
    public function index()
    {
		$user = session('login');
		//查询当前用户机器人
		$robot = db('robot')
					->where('uid',session('user.id'))
					->select();
		
		//查询出最近的聊天记录
		if($user['level']>6){
			
			$msg = db('chatcontent')
					->order('id desc')
					->limit(10)
					->select();
		}else{
			
			$msg = db('chatcontent')
					->where('status=1')
					->order('id desc')
					->limit(10)
					->select();
			
		}
		
		
		
		//处理时间格式
		foreach($msg as $k=>$v){
			
			$msg[$k]['time'] = date('Y-m-d H:i:s',$v['time']);
			
		}
		$msg = json_encode($msg);
		
		
		//查询房间信息
		$room = db('room')->find();
		
		//查询客服QQ
		$service = db('service')
					->where('status',1)
					->field('content')
					->find();
		
		//查询banner图
		$banner = db('banner')->select();
		
		$this->assign('banner',$banner);
		$this->assign('service',$service);
		$this->assign('room',$room);
		$this->assign('msg',$msg);//转成json格式在前段循环输出 不转的话会报错
		$this->assign('robot',$robot);
		$this->assign('user',session('user'));
        return view();
    }
	
	public function login(){
		$type = input('get.type');
		$this->assign('type',$type);
		return view();
	}
	
	//表情
	public function face(){
		return view();
	}
	
	//判断是否登录
	public function isLogin()
	{
		$uid = session('user.id');
		if(!empty($uid)){
			$login_user = db('user')
							->where('id',$uid)
							->find();
			unset($login_user['password']);				
			session('login',$login_user);
			session('user',$login_user);
		}
		
		$user = session('login');
			
		if(empty($user)){
			
			$random_num = substr(time(),5).rand(1,100);
		
			$user = ['id'=>$random_num,'level'=>0,'name'=>'游客'.$random_num,'icon'=>'/room/images/header_sculpture.png','kefu'=>0];
			
			session('login',$user);
			
		}
		
		$user = json_encode($user);
		
		echo $user;
	}
	
	//登录验证
	public function verify_login(){
		$name = input('post.name');
		$password = input('post.password');
		$msg = array();
		$user = db('user');
		
		$user_arr = $user
				->where('phone',$name)
				->where('password',md5(md5($password).'hejing'))
				->find();
		
		if(empty($user_arr)){
			$msg['type'] = -1;
			$msg['msg']  = '手机号或者密码错误 请重新输入';
			echo json_encode($msg);
			return;
		}
		
		//设置登录状态
		$user
			->where('phone',$name)
			->update(['login_status'=>1,'login_ip'=>request()->ip()]);
			
		
		$user_arr['time'] = time();
		session('user',$user_arr);
		
		//保存登录信息
		unset($user_arr['password']);
		session('login',$user_arr);
		
		//返回用户信息
		$msg['id']   = $user_arr['id'];
		$msg['level'] = $user_arr['level'];
		$msg['icon'] = $user_arr['icon'];
		$msg['name'] = $user_arr['name'];
		$msg['type'] = 1;
		echo json_encode($msg);
		return;
	}
	
	//注册
	public function verify_register(){
		
		$user_array = input('post.');
		$user_array['password'] = md5(md5($user_array['password']).'hejing');
		$user_array['icon'] = '/room/images/header_sculpture.png';//默认头像
		$user_array['sex']  = 1;
		$user_array['level']= 1; 
		$user_array['register_time']=time();
		$user_array['login_ip'] = request()->ip();
		
		$msg = array();
	
		if(trim($user_array['name'])==''){
			$msg['type']=-1;
			$msg['msg'] = '用户名为空';
			echo json_encode($msg);
			return;
		}else if(trim($user_array['password'])==''){
			$msg['type']=-1;
			$msg['msg'] = '密码为空';
			echo json_encode($msg);
			return;
		}else if(session('sms.code')!=$user_array['yzm']){
			$msg['type']=-1;
			$msg['msg'] = '验证码不正确';
			echo json_encode($msg);
			return;
		}
		else{
			$user = db('user');
			$name = $user
					->where('name','EQ',$user_array['name'])
					->whereOr('phone','EQ',$user_array['phone'])
					->find();
			if(!empty($name)){
				$msg['type']=-1;
				$msg['msg'] = '用户名已存在或手机已被注册';
				echo json_encode($msg);
				return;
			}
			unset($user_array['yzm']);//销毁验证码数据,否则不能添加数据库
			$flag = $user->insertGetId($user_array);
			if($flag){
				session('sms',null);
				$user_array['time'] = time();
				unset($user_array['password']);
				session('user',$user_array);
				session('login',$user_array);
				$msg['type']=1;
				$msg['id']  = $flag;//获取主键ID
				$msg['name'] = $user_array['name'];
				$msg['icon'] = $user_array['icon'];
				$msg['level']= $user_array['level'];
				echo json_encode($msg);
				return;
			}else{
				$msg['type']=1;
				$msg['msg'] = '系统繁忙,注册失败,请稍后再试！';
				echo json_encode($msg);
				return;
			}
		}
		
	}
	
	//退出登录
	public function loginOut(){
		session('user',null);
		session('login',null);
		$this->redirect('Index/index');
	}
	
	
	//机器人
	public function robot(){
		
		$user = session('user');
		if($user['level']<7){
			$this->error('权限小于7,不可更改');
			return false;
		}
		
		//查询当前用户机器人
		$robot = db('robot')
					->alias('r')
					->join('role ro','r.level=ro.level')
					->where('uid='.$user['id'])
					->select();
		
		//查询角色
		$role = db('role')
					->select();
		$this->assign('role',$role);
		$this->assign('robot',$robot);			
		return view();
		
	}
	
	//添加机器人
	public function add_robot(){
		
		$rot['nick_name'] = input('post.name');
		$rot['level'] = input('post.level');
		$rot['uid'] = session('user.id');
		
		if(empty($rot['uid'])){
			$this->error('用户ID不存在');
			return;
		}
		
		$cur = db('robot')
					->where('nick_name="'.$rot['nick_name'].'"')
					->find();
		
		if(!empty($cur)){
			
			echo '{"type":"-1","msg":"昵称已存在"}';
			return;
		}
		
		$flag = db('robot')->insert($rot);
		
		if($flag){
			echo '{"type":"1","msg":"添加成功"}';
		}else{
			echo '{"type":"-1","msg":"数据添加失败."}';
		}
	}
	
	//删除机器人
	public function del_robot(){
		
		$id = input('post.id');
		$flag = db('robot')->delete($id);
		
		if($flag){
			echo '{"type":"1","msg":"删除成功"}';
		}else{
			echo '{"type":"-1","msg":"删除失败"}';
		}
	}
	
	
	//黑名单
	public function black(){
		
		return view();
		
	}
	
}
