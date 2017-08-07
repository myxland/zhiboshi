<?php
namespace app\index\controller;
class SendSms extends \think\Controller{
	
	public function sms(){
	
		$mobile = input('post.mobile');
		
		$type = input('post.type');
		
		if(!preg_match('/\d{11}/',$mobile)){
			echo -1;
			return false;
		}
		
		if($type=='default'){
			$flag = $this->send($mobile);
			if($flag){
				echo 1;	
			}else{
				echo -1;
			}
		}
	}
	
	public function send($mobile){
		date_default_timezone_set('Asia/Shanghai');
		vendor('alidayu.TopSdk');
		$c = new \TopClient;
		$c->appkey = "23467398";//必填用户appkey 
		$content = rand(100000,999999);
		session('sms',array('code'=>$content,'time'=>time()));
        $c->secretKey = "7c8f29c7c17e53e5e4bd8e46ba3dd3b6";//必填 用户secretKey 
		$req = new \AlibabaAliqinFcSmsNumSendRequest;
		$req->setSmsType("normal");
		$req->setSmsFreeSignName("短信验证");
		$req->setSmsParam("{\"yanzheng\":\"".$content."\"}");//验证码和网站名字
		$req->setRecNum($mobile);
		$req->setSmsTemplateCode("SMS_46560082");//短息模板 由阿里大鱼用户提供认证通过才行
		$resp = $c->execute($req);
		if($resp->result->success){
           return 1;
        }else{
           return -1;
        }
	}
} 