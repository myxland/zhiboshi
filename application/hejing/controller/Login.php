<?php
namespace app\hejing\controller;

class Login extends \think\Controller
{
    public function index(){
	   
	  return view();
	   
    }
   
   
    public function check_login(){
	   
	   $arr['uname'] = input('post.uname');
	   $arr['upwd']  = input('post.upwd');
	   
	   $user = db('admin')
				->where('uname',$arr['uname'])
				->where('upwd',md5(md5($arr['upwd']).'hejing'))
				->find();
				
		if(!empty($user)){
			
			session('admin',$user);
			echo 1;
			
		}else{
			
			echo -1;
			
		}		
	   
    }
}
