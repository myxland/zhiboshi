<?php
namespace app\index\controller;

class Upload extends \think\Controller
{
	//上传图片
	public function uploadimg(){
		
		$file = input('file.image');
		//dump($file);return;
		$info = $file->validate(['ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
		if($info){
			
			$imgSrc=$info->getSaveName();
            $image = \think\Image::open($imgSrc);
            $image->thumb($image->width(), $image->height(),1)->save($imgSrc);//生成缩略图、删除原图以及添加水印
			
			$msg['type'] = 1;
			$msg['img']  = $info->getSaveName();
			echo json_encode($msg);
		   // 输出 42a79759f284b767dfcb2a0197904287.jpg
			//echo $info->getFilename(); 
		}else{
			// 上传失败获取错误信息
			$msg['type'] = -1;
			$msg['info'] = $file->getError();
			echo json_encode($msg);
		}

	}
	
	
	//上传word excel
	public function uploadword(){
		
		$file = input('file.download');
		//dump($file);return;
		$info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
		if($info){
			// 成功上传后 获取上传信息
			// 输出 jpg
			//echo $info->getExtension();
			// 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
			$msg['type'] = 1;
			$msg['img']  = $info->getSaveName();
			echo json_encode($msg);
		   // 输出 42a79759f284b767dfcb2a0197904287.jpg
			//echo $info->getFilename(); 
		}else{
			// 上传失败获取错误信息
			$msg['type'] = -1;
			$msg['info'] = $file->getError();
			echo json_encode($msg);
		}

	}
	
}