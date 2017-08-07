<?php
namespace app\hejing\controller;

class Index extends Islogin
{
   public function index(){
	   
	  return view();
	   
   }
   
   public function welcome(){
	   
	   $room = db('room')->find();
	   $course = db('course')->select();
	   
	   $this->assign('course',$course);
	   $this->assign('room',$room);
	   return view();
	   
   }
   
   
   public function edit_course(){
	   
	   if($_POST){
		   
		   $arr = input('post.arr');
		   
		   $arr = json_decode($arr,true);
		   
		   foreach($arr as $k=>$v){
				$k+=1;
			   $flag = db('course')
						->where('id',$k)
						->update(['time'=>$v[0],'day1'=>$v[1],'day2'=>$v[2],'day3'=>$v[3],'day4'=>$v[4],'day5'=>$v[5],]);
			   
		   }
		   
		   if($flag!==false){
			   echo 1;
		   }else{
			   echo -1;
		   }
	   }
   }
   
   
   public function edit(){
	 
	if($_POST){
		
		$room = input('post.');
		unset($room['image']);
		$flag = db('room')
				->where('id=1')
				->update($room);
		if($flag!==false){
			$this->success('修改成功');
		}else{
			$this->error('修改失败');
		}		
		
	}else{
		
		//查询数据
		$room = db('room')->find();
		   
		$this->assign('room',$room);
		return view();
	}
	
	   
   }
   
   
   
   public function banner(){
	   
	   $banner = db('banner')->select();
	   
	   $this->assign('banner',$banner);
	   return view();
	   
   }
   
   
   public function del_banner(){
	   
	   $id = input('post.id');
	   
	   $flag = db('banner')->delete(['id'=>$id]);
	   if($flag){
				
			echo '{"type":"1"}';
		}else{
				
			echo '{"type":"-1","msg":"删除失败"}';
		}
	   
   }
   
   
   
   public function edit_banner(){
	   
	   
	   if($_GET){
		   
		   $id = input('get.id');
		   $banner = db('banner')->where('id',$id)->find();
		   
		   $this->assign('id',$id);
		   $this->assign('banner',$banner);
		   return view();
	   }else if($_POST){
		   
		    $arr = input('post.');
			unset($arr['id']);
			$id  = input('post.id');
			$flag = db('banner')
						->where('id',$id)
						->update($arr);
						
			if($flag!==false){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"修改失败"}';
			}		
		   
	   }
	   
   }
   
   
   public function add_banner(){
	   
	   if($_POST){
		   
		    $arr = input('post.');
			$flag = db('banner')
						->insert($arr);
						
			if($flag){
				
				echo '{"type":"1"}';
			}else{
				
				echo '{"type":"-1","msg":"添加失败"}';
			}		
		   
	   }else{
		   
			return view();
	   
	   }
	   	   
   }
  
}
