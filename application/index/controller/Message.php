<?php
namespace app\index\controller;

class Message extends \think\Controller
{
	//添加发言记录到数据库
	public function addMessage(){
		
		$msg = json_decode(input('post.msg'),true);
		$data['chatname'] = $msg['name'];
		$data['chatmessage']=$msg['content'];
		$data['chatlevel'] = $msg['level'];
		$data['uid'] = $msg['uid'];
		$data['time'] = time();
		
		if($msg['level']>6 || $msg['msg']=='robot'){
			$data['status'] = 1;
		}else{
			$data['status'] = 0;
		}
		
		$flag = db('chatcontent')->insertGetId($data);
		if($flag){
			echo '{"id":"'+$flag+'"}';
		}else{
			echo '{"msg":"数据入库失败","type":"-1"}';
		}
	}
	
	
	//修改发言记录的状态
	public function editMessage(){
		
		$id = input('post.id');
		$flag = db('chatcontent')->where('id',$id)->update(['status'=>1]);
		echo $flag;
		
	}
	
	
	//删除发言
	public function delMessage(){
		
		
		$id = input('post.id');
		$flag = db('chatcontent')->where('id',$id)->delete();
		echo $flag;
		
	}
}