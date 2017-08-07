<?php
namespace app\hejing\controller;

class Jiangshi extends Islogin
{
	
	public function index(){
		
		$jiangshi = db('jiangshi')
					->order('id desc')
					->select();
		
		$this->assign('jiangshi',$jiangshi);
		return view();
		
	}
	
	
	public function add_jiangshi(){
		
		if($_POST){
			$arr = input('post.');
			$flag = db('jiangshi')->insert($arr);
			
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"添加失败"}';
			}
			
		}else{
			return view();
		}
	
	}
	
	
	public function edit_jiangshi(){
		
		if($_GET){
			
			$id = input('get.id');
			$jiangshi = db('jiangshi')
						->where('id',$id)
						->find();
			
			$this->assign('jiangshi',$jiangshi);
			$this->assign('id',$id);
			return view();
			
		}else if($_POST){
			
			$arr = input('post.');
			$id  = input('post.id');
			unset($arr['id']);
			
			$flag = db('jiangshi')
					->where('id',$id)
					->update($arr);
					
			if($flag!==false){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"修改失败"}';
			}
		}
		
	}
	
	
	
	public function del_jiangshi(){
		
		if($_POST){
			
			$id = input('post.id');
			$flag = db('jiangshi')
						->where('id',$id)
						->delete();
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"删除失败"}';
			}				
		}
		
		
	}
	
}