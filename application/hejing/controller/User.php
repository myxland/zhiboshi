<?php
namespace app\hejing\controller;

class User extends Islogin
{
	
	public function index(){
			
		
		$where = '';
		$is_where = '';
		if($_GET){
			
			$begin = input('get.begin');
			$end = input('get.end');
			$name = input('get.name');
			
			if(!empty($begin) && !empty($end)){
				$where['register_time'] = array(array('EGT',$begin),array('ELT',$end),'AND'); 
			}else if(!empty($begin) && empty($end)){
				$where['register_time'] = array('EGT',$begin); 
			}else if(empty($begin) && !empty($end)){
				$where['register_time'] = array('ELT',$end); 
			}
			
			if(!empty($name)){
				$where['name|phone'] = array('EQ',$name);
			}
			
			$is_where = json_encode($where);
			
			
		}
		
		
		
		$user = db('user')
				->where($where)
				->paginate(20);
				
		$role = db('role')->select();		
		
		$user_count = db('user')->count();
		
		$this->assign('where',$is_where);
		$this->assign('user_count',$user_count);
		$this->assign('role',$role);
		$this->assign('user',$user);
		return view();
		
	}
	
	
	public function edit_level(){
		
		$id = input('post.id');
		$level = input('post.level');
		
		$flag = db('user')
					->where('id',$id)
					->update(['level'=>$level]);
		
		if($flag!==false){
			echo '{"type":"1"}';
		}else{
			echo '{"type":"-1","msg":"修改失败"}';
		}
		
	}
	
	
	
	public function edit_user(){
		
		if($_POST){
			
			
			$arr = input('post.');
			if(empty($arr['password'])){
				unset($arr['password']);
			}else{
				$arr['password'] = md5(md5($arr['password']).'hejing');
			}
			$flag = db('user')->update($arr);
			
			if($flag!==false){
				echo '{"type":"1"}';
			}else{
				echo '{"type":"-1","msg":"修改失败"}';
			}
			
		}else if($_GET){
			
			$id = input('get.id');
			$user = db('user')
						->where('id',$id)
						->find();
			
			$this->assign('id',$id);
			$this->assign('user',$user);
			return view();
			
		}	
		
	}
	
	
	
	public function del_user(){
		
		
		$id = input('post.id');
		
		$flag = db('user')
					->where('id',$id)
					->delete();
		
		
		if($flag){
			echo '{"type":"1"}';
		}else{
			echo '{"type":"-1","msg":"删除失败"}';
		}
	}
	
	
	
	public function export(){
		
		
		if($_GET){
			
			$where = input('get.where');
			$where = json_decode($where,true);
			$user = db('user')
					->where($where)
					->select();
			
			
			$this->excel($user);		
		}
		
	}
	
	
	
	public function excel($data){
		
		vendor('PHPExcel/PHPExcel');
		vendor('PHPExcel/PHPExcel/IOFactory');
		$objPHPExcel = new \PHPExcel();
		
		// Set document properties
		$objPHPExcel->getProperties()->setCreator("test")
		->setLastModifiedBy("Maarten Balliauw")
		->setTitle("Office 2007 XLSX Test Document")
		->setSubject("Office 2007 XLSX Test Document")
		->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
		->setKeywords("office 2007 openxml php")
		->setCategory("Test result file");
		
		$titlesLables = array(
			    "name" =>"姓名",
			    "sex" =>"性别",
			    "phone" =>"电话",
			    "level" =>"等级",
			    "register_time" =>"注册时间",
			    "login_ip" =>"登录ip",
		);
		$titles = array_keys($titlesLables);
		
		$arr = $data;
		
		
		$titleCount = count($titles);
		$ii = 1;
		for($i= 'A';$i <= 'Z'; $i++){
			if ($ii > $titleCount)
			{
				break;
			}
			
			$objPHPExcel->setActiveSheetIndex(0)
			->setCellValue($i.'1', $titlesLables[$titles[$ii-1]]);
			$objPHPExcel->getActiveSheet()->getDefaultColumnDimension($i.'1')->setWidth(20);
			$ii++;
		}
		
		foreach($arr as $rowi => $tmp){
			$ii = 1;
			for($i= 'A';$i <= 'Z'; $i++){
				if ($ii > $titleCount)
				{
					break;
				}
				
				if($titles[$ii-1]=='register_time'){
					$arr[$rowi][ $titles[$ii-1] ] = date('Y-m-d H:i:s',$arr[$rowi][ $titles[$ii-1] ]);
				}
				
				$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue($i.($rowi+2), $arr[$rowi][ $titles[$ii-1] ]);
				$ii++;
			}
		}
		
		ob_clean();
		// Rename worksheet
		$objPHPExcel->getActiveSheet()->setTitle('用户信息');
		// Set active sheet index to the first sheet, so Excel opens this as the first sheet
		$objPHPExcel->setActiveSheetIndex(0);
		// Redirect output to a client’s web browser (Excel2007)
		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename="用户信息.xlsx"');
		header('Cache-Control: max-age=0');
		// If you're serving to IE 9, then the following may be needed
		header('Cache-Control: max-age=1');
		// If you're serving to IE over SSL, then the following may be needed
		header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
		header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
		header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
		header ('Pragma: public'); // HTTP/1.0
		$objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		
		$objWriter->save('php://output');
		exit;
		
	}
	
}