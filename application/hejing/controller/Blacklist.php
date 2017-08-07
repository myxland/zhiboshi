<?php
namespace app\hejing\controller;

class Blacklist extends Islogin
{
	
	public function index(){
		
		$black = db('blacklist')->select();
		
		$this->assign('black',$black);
		return view();
		
	}
	
	
	public function add_ip(){
		
		$arr = input('post.');
		
		$ip = db('blacklist')->where('ip',$arr['ip'])->find();		
		if(!empty($ip)){
			
			echo '{"type":"-1","msg":"ip已存在,请勿重新添加"}';
		
		}else{
			
			$flag = db('blacklist')->insert($arr);
			if($flag){
				
				echo '{"type":"1"}';
				
			}else{
				
				echo '{"type":"-1","msg":"添加失败"}';
				
			}
			
		}
	}
	
	
	
	public function del_ip(){
		
		
		$id = input('post.id');
		
		$flag = db('blacklist')->delete($id);
		if($flag){
				
			echo '{"type":"1"}';
				
		}else{
				
			echo '{"type":"-1","msg":"删除失败"}';
				
		}
	}
	
}