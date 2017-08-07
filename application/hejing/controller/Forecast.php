<?php
namespace app\hejing\controller;

class Forecast extends Islogin
{
	
	public function index(){
		
		//查询资讯
		$forecast = db('forecast')
				->order('id desc')
				->paginate(10);
					
		$this->assign('forecast',$forecast);
		return view();
		
	}
	
	
	public function add_forecast(){
		
		if($_POST){
			
			$arr = input('post.');
			
			$arr['time'] = time();
			
			$flag = db('forecast')->insert($arr);
			
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"添加失败"}';
			}
			
		}else{
			
			return view();
			
		}	
		
	}
	
	
	public function edit_forecast(){
		
		if($_GET){
			
			$id = input('get.id');
			$forecast = db('forecast')
						->where('id',$id)
						->find();
			
			$this->assign('id',$id);
			$this->assign('forecast',$forecast);
			return view();
			
		}else if($_POST){
			
			$arr = input('post.');
			$arr['time'] = time();
			unset($arr['id']);
			$id  = input('post.id');
			$flag = db('forecast')
						->where('id',$id)
						->update($arr);
						
			if($flag!==false){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"修改失败"}';
			}		
		}
		
	}
	
	
	public function del_forecast(){
		
		if($_POST){
			
			$id = input('post.id');
			$flag = db('forecast')
						->where('id',$id)
						->delete();
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"删除失败"}';
			}				
		}
		
	}
	
	
	public function batchForecast(){
		
		
		if($_POST){
			
			$id = input('post.id');
			$id = json_decode($id,true);
			
			$flag = db('forecast')
						->delete($id);
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"批量删除失败"}';
			}				
			
		}
		
	}
}