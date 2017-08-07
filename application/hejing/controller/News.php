<?php
namespace app\hejing\controller;

class News extends Islogin
{
	
	public function index(){
		
		//查询资讯
		$news = db('news')
				->order('id desc')
				->paginate(10);
					
		$this->assign('news',$news);
		return view();
		
	}
	
	
	public function add_news(){
		
		if($_POST){
			
			$arr = input('post.');
			
			$arr['time'] = time();
			
			$flag = db('news')->insert($arr);
			
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"添加失败"}';
			}
			
		}else{
			
			return view();
			
		}	
		
	}
	
	
	public function edit_news(){
		
		if($_GET){
			
			$id = input('get.id');
			$news = db('news')
						->where('id',$id)
						->find();
			
			$this->assign('id',$id);
			$this->assign('news',$news);
			return view();
			
		}else if($_POST){
			
			$arr = input('post.');
			$arr['time'] = time();
			unset($arr['id']);
			$id  = input('post.id');
			$flag = db('news')
						->where('id',$id)
						->update($arr);
						
			if($flag!==false){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"修改失败"}';
			}		
		}
		
	}
	
	
	public function del_news(){
		
		if($_POST){
			
			$id = input('post.id');
			$flag = db('news')
						->where('id',$id)
						->delete();
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"删除失败"}';
			}				
		}
		
	}
	
	
	public function batchNews(){
		
		
		if($_POST){
			
			$id = input('post.id');
			$id = json_decode($id,true);
			
			$flag = db('news')
						->delete($id);
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"批量删除失败"}';
			}				
			
		}
		
	}
}