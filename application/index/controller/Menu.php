<?php
namespace app\index\controller;

class Menu extends \think\Controller
{
	
	public function jiangshi(){
		
		//查询客服QQ
		$service = db('service')
					->where('status',1)
					->field('content')
					->find();
		
		//查询讲师数据
		$jiangshi = db('jiangshi')->select();
		
		$this->assign('service',$service);
		$this->assign('jiangshi',$jiangshi);
		return view();
	}
	
	
	public function jiancang(){
		
		//查询商品数据
		$goods = db('goods')->select();
		
		//查询老师数据
		$teacher = db('user')->where('level=7')->select();
		
		$where['is_pingcang']= array('EQ','0');
		//查询条件
		if($_GET){
			
			$begin = input('get.begin');
			$end = input('get.end');
			$goods_id = input('get.goods');
			$teacher_id = input('get.teacher');
			
			if(!empty($begin) && !empty($end)){
				$where['time'] = array(array('EGT',$begin),array('ELT',$end),'AND'); 
			}else if(!empty($begin) && empty($end)){
				$where['time'] = array('EGT',$begin); 
			}else if(empty($begin) && !empty($end)){
				$where['time'] = array('ELT',$end); 
			}
			
			if(!empty($goods_id)){
				
				$where['goods_id'] = array('EQ',$goods_id);
				
			}
			
			if(!empty($teacher_id)){
				
				$where['teacher_id'] = array('EQ',$teacher_id);
				
			}
			
		}
		
		
		//查询建仓数据
		$jiancang = db('jiancang')
					->alias('j')
					->join('user u','j.teacher_id=u.id')
					->join('goods g','j.goods_id=g.id')
					->where($where)
					->order('jiancang_id desc')
					->paginate(20);
		
		$this->assign('teacher',$teacher);
		$this->assign('jiancang',$jiancang);
		$this->assign('goods',$goods);
		return view();
		
	}
	
	
	public function add_jiancang(){
		
		if($_POST){
			
			if(session('user.level')<7){
				$this->error('你没有权限修改');
				return false;
			}
			
			$arr = input('post.arr');
			$arr = json_decode($arr,true);
			$arr['teacher_id'] = session('user.id');
			$arr['time'] = time();
			
			$flag = db('jiancang')->insert($arr);
			if($flag){
				echo '{"type":"1"}';
			}else{
				echo '{"type":"-1","msg":"添加失败"}';
			}
		}else{
			
			//查询商品数据
			$goods = db('goods')->select();
			
			$this->assign('goods',$goods);
			return view();
				
		}
			
		
	}
	
	
	public function edit_jiancang(){
		
		if($_GET){
			
			$id = input('get.id');
			
			$jiancang = db('jiancang')->where('jiancang_id',$id)->find();
			
			$this->assign('jiancang',$jiancang);
			$this->assign('id',$id);
			return view();
			
		}else if($_POST){
			
			if(session('user.level')<7){
				$this->error('你没有权限修改');
				return false;
			}
			
			$arr = input('post.arr');
			$arr = json_decode($arr,true);
			
			$flag = db('jiancang')->update($arr);
			if($flag!==false){
				echo '{"type":"1"}';
			}else{
				echo '{"type":"-1","msg":"修改失败"}';
			}
			
		}
		
	}
	
	
	public function del_jiancang(){
		
		if($_POST){
			$id = input('post.id');
			$flag = db('jiancang')->where('jiancang_id',$id)->delete();
			if($flag){
				echo '{"type":"1"}';
			}else{
				echo '{"type":"-1","msg":"删除失败"}';
			}
		}
		
	}
	
	
	public function course(){
		
		//查询老师数据
		$course = db('course')->select();
		
		$this->assign('course',$course);
		return view();
		
	}
	
	public function newslist(){
		
		
		$news = db('news')->paginate(10);
		
		$this->assign('news',$news);
		return view();
		
	}
	
	
	public function kejian(){
		
		
		$kejian = db('kejian')->paginate(10);
		
		$this->assign('kejian',$kejian);
		return view();
		
	}
	
	
	public function forecast(){
		
		
		$forecast = db('forecast')->paginate(10);
		
		$this->assign('forecast',$forecast);
		return view();
		
	}
	
	
	
	public function edit_pingcang(){
		
		if($_GET){
			
			$id = input('get.id');
			$goods_name= input('get.goods_name');
			
			$this->assign('goods_name',$goods_name);
			$this->assign('id',$id);
			return view();
			
		}else if($_POST){
			
			$arr = input('post.arr');
			$arr = json_decode($arr,true);
			$arr['is_pingcang'] = 1;
			$arr['time'] = time();
			
			$flag = db('jiancang')->update($arr);
			if($flag!==false){
				echo '{"type":"1"}';
			}else{
				echo '{"type":"-1","msg":"修改失败"}';
			}
			
		}
		
	}
	
	
	public function pingcang(){
		
		//查询商品数据
		$goods = db('goods')->select();
		
		//查询老师数据
		$teacher = db('user')->where('level=7')->select();
		
		$where['is_pingcang']= array('EQ','1');
		//查询条件
		if($_GET){
			
			$begin = input('get.begin');
			$end = input('get.end');
			$goods_id = input('get.goods');
			$teacher_id = input('get.teacher');
			
			if(!empty($begin) && !empty($end)){
				$where['time'] = array(array('EGT',$begin),array('ELT',$end),'AND'); 
			}else if(!empty($begin) && empty($end)){
				$where['time'] = array('EGT',$begin); 
			}else if(empty($begin) && !empty($end)){
				$where['time'] = array('ELT',$end); 
			}
			
			if(!empty($goods_id)){
				
				$where['goods_id'] = array('EQ',$goods_id);
				
			}
			
			if(!empty($teacher_id)){
				
				$where['teacher_id'] = array('EQ',$teacher_id);
				
			}
			
		}
		
		
		//查询平仓数据
		$jiancang = db('jiancang')
					->alias('j')
					->join('user u','j.teacher_id=u.id')
					->join('goods g','j.goods_id=g.id')
					->where($where)
					->order('jiancang_id desc')
					->paginate(20);
		
		$this->assign('teacher',$teacher);
		$this->assign('jiancang',$jiancang);
		$this->assign('goods',$goods);
		return view();
		
	}
	
	
	
	public function jiancang_msg(){
		
		if($_POST){
			
			$msg = input('post.msg');
			$msg = json_decode($msg,true);
			$msg['chatlevel'] = 8;
			$msg['status'] = 1;
			$msg['time'] = time();
			
			$flag = db('chatcontent')->insert($msg);
			if($flag){
				echo 1;
			}
			
		}
		
	}
	
	
	
	public function details(){
		
		$type = input('get.type');
		$id   = input('get.id');
		
		if($type=='news'){
			$arr = db('news')
					->where('id',$id)
					->find();
		}else if($type=='kejian'){
			$arr = db('kejian')
					->where('id',$id)
					->find();
		}else if($type=='forecast'){
			$arr = db('forecast')
					->where('id',$id)
					->find();
		}else{
			echo '参数有误';
			return false;
		}
		
		$this->assign('type',$type);
		$this->assign('arr',$arr);
		return view();
		
	}
	
}