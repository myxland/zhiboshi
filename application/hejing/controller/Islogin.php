<?php
namespace app\hejing\controller;

class Islogin extends \think\Controller
{
	public function __construct()
    {
		parent::__construct();
        if(session('admin')==null || session('admin')==''){
		   $this->redirect('Login/index');
		}
    }
	
   
}
