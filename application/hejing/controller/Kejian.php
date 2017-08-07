<?php
namespace app\hejing\controller;

class Kejian extends Islogin
{
	
	public function index(){
		
		//查询资讯
		$kejian = db('kejian')
				->order('id desc')
				->paginate(10);
					
		$this->assign('kejian',$kejian);
		return view();
		
	}
	
	
	public function add_kejian(){
		
		if($_POST){
			
			$arr = input('post.');
			
			$arr['time'] = time();
			
			$flag = db('kejian')->insert($arr);
			
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"添加失败"}';
			}
			
		}else{
			
			return view();
			
		}	
		
	}
	
	
	public function edit_kejian(){
		
		if($_GET){
			
			$id = input('get.id');
			$kejian = db('kejian')
						->where('id',$id)
						->find();
			
			$this->assign('id',$id);
			$this->assign('kejian',$kejian);
			return view();
			
		}else if($_POST){
			
			$arr = input('post.');
			$arr['time'] = time();
			unset($arr['id']);
			$id  = input('post.id');
			$flag = db('kejian')
						->where('id',$id)
						->update($arr);
						
			if($flag!==false){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"修改失败"}';
			}		
		}
		
	}
	
	
	public function del_kejian(){
		
		if($_POST){
			
			$id = input('post.id');
			$flag = db('kejian')
						->where('id',$id)
						->delete();
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"删除失败"}';
			}				
		}
		
	}
	
	
	public function batchKejian(){
		
		
		if($_POST){
			
			$id = input('post.id');
			$id = json_decode($id,true);
			
			$flag = db('kejian')
						->delete($id);
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"批量删除失败"}';
			}				
			
		}
		
	}
}