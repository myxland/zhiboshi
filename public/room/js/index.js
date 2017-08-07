function showFacePanel(e,toinput){
	$('#face').css('display','block');
	$.get(face,function(data){
			$('#face').html(data);
			$('#facenav li').click(function(){
				var rel = $(this).attr('rel');
				$('#face dl').hide();
				$('#f_'+rel).show();
				$(this).siblings().removeClass('f_cur');
				$(this).addClass('f_cur');
			});
			$('#face dd').click(function(){
				var img_link = $(this).find('img').attr('src');
				var img_alt  = $(this).attr('title');
				var cur = $('#msg_text').html();
					cur+= '<img src="'+img_link+'" alt="'+img_alt+'" />';
				$('#msg_text').html(cur);	
				$('#msg_text').scrollTop( $('#msg_text').prop("scrollHeight"));
			});
		}).success(function(e){
			$(document).bind('mouseup',function(e){
			if($(e.target).attr('isface')!='1' && $(e.target).attr('isface')!='2')
			{
				$('#face').hide();
				$(document).unbind('mouseup');
			}
			else if($(e.target).attr('isface')=='1')
			{
				var toinput =$('#face').attr("toinput");
							if($(e.target).attr('src')!=undefined){
				$(toinput).append('<img src="'+$(e.target).attr('src')+'" onresizestart="return false" contenteditable="false">');}
			}
		});
	});
		
}


//处理弹出层
function toLoad(e){
	if(e=='login'){
		layer.open({
			//skin: 'layui-layer-nobg',
			type: 2,
			title: false,
			area: ['370px', '525px'],
			shade: ['0.1','#fff'],
			closeBtn: 1,
			shadeClose: true,
			content: login+'?type=login'
			
		});
	}else if(e=='register'){
		layer.open({
			//skin: 'layui-layer-nobg',
			type: 2,
			title: false,
			area: ['370px', '525px'],
			shade: ['0.1','#fff'],
			closeBtn: 1,
			shadeClose: true,
			content: login+'?type=register'
			
		});
	}else if(e=='robot'){
		layer.open({
			//skin: 'layui-layer-nobg',
			type: 2,
			title: false,
			area: ['560px', '400px'],
			shade: ['0.1','#fff'],
			closeBtn: 1,
			shadeClose: true,
			content: robot
			
		});
	}
}


//监听回车键
$('#msg_text').bind('keyup',function(e){
	if(e.keyCode==13){
	
		sendMsg();
	}
});

$('#btn_sendmsg').click(function(){
	sendMsg();
});

//获取ID（msg_text）内容 发送消息
function sendMsg(){
	
	var c = $('#msg_text').html();
	
	var user = localStorage.getItem('user');
	
	user = JSON.parse(user);
	
	c = msgFormat(c);//处理消息格式
	
	if(c==''||c==null){
		layer.msg('内容不能为空',{time:1000});
		$('#msg_text').html('');
		return false;
	}
	
	if(user['level']>6){
		var sty = 'color:#CD0000;';
	}else{
		var sty ='';
	}
	
	//消息先显示在当前用户页面下
	var icon = '<img src="'+imgLink+'user'+user.level+'.png" class="msg_group_ico" title="会员 -注册用户">';
	var info = '<div class="msg notmine "><div class="msg_head">'+icon+'</div><div class="msg_content"><div><font class="u">'+user.name+'</font>&nbsp;&nbsp; <font class="date">'+getTime()+'</font></div><div class="layim_chatsay"><font style="font-size:13px;'+sty+'">'+c+'</font></div></div></div>';
	var chat_info = $('#chat_info').html();
	chat_info += info;		
	$('#chat_info').html(chat_info);
	
	//输入框清空 滚动条定位底部
	$('#msg_text').html('');
	$('.chat').scrollTop( $('.chat').prop("scrollHeight"));
	
	if(user['name']!=cur_user['name'] && user['level']>0){
		var msg = '{"uid":"'+user.id+'","msg":"robot","level":"'+user.level+'","name":"'+user.name+'","icon":"'+user.icon+'","content":"'+c+'"}';
	}else{
		 var msg = '{"uid":"'+user.id+'","msg":"sendInfo","level":"'+user.level+'","name":"'+user.name+'","icon":"'+user.icon+'","content":"'+c+'"}';
	}
	
	
	msg = JSON.parse(msg);
	msg['content']=escape(msg['content']); 
	msg = JSON.stringify(msg);
	//ajax将发言存入数据库
	$.post(message,{msg:msg},function(data){
		data = JSON.parse(data);
		if(data.type==-1){
			alert('发言失败,请联系客服');					
		}else{
			msg = msg.substring(0,msg.length-1);
			msg+=',"chatid":"'+data+'"'+'}';//拼接上聊天id
			ws.send(msg);
		}
		
	});
	
}


//处理消息的格式
function msgFormat(message){
	
	message = message.replace(/<br>/g,"");
	message = message.replace(/<div>/g,"");
	message = message.replace(/<\/div>/g,"");
	message = message.replace(/\"/g,"'");
	return message; 
}

//获取当前时间
function getTime(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return year+'-'+month+'-'+day+'-'+' '+hour+':'+minute+':'+second;
}


//切换机器人发言
$('#robot').change(function(e){
	var level = $('#robot').val();
	var nick_name = $('#robot option:selected').html();
	var user = '{"level":"'+level+'","name":"'+nick_name+'"}';
	localStorage.setItem('user',user);
	
});


//上传图片
function UploadFile(id){
	
	 $.ajaxFileUpload
            (
                {
                    url: uploadImg, //用于文件上传的服务器端请求地址
                    secureuri: false, //一般设置为false
                    fileElementId: 'image', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                    dataType: 'text', //返回值类型 一般设置为json
                    success: function (data)  //服务器成功响应处理函数
                    {
						data = JSON.parse(data);
						data.img = data.img.replace(/\\/g, "/");
                        if(data.type==1){
							var _html = $('#msg_text').html();
								_html +="<img src='"+uploadUrl+data.img+"' width='100px' height='100px' onclick='large(this)'/>";
								$('#msg_text').html(_html);
						}else{
							layer.msg(data.info,{time:2000});
						}
                    }
                }
            )
            return false;
	
}

//查看大图
function large(e){
	
	var id = $(e).parent().parent();

	layer.photos({
	  photos:id
	  ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
	}); 
	
}


//在线会员 我的客服
$('.userlist-menu').click(function(){
	$(this).css('opacity',0.4);
	$(this).siblings('.userlist-menu').css('opacity',0.6);
	var flag = $(this).html();
	if(flag=='在线会员'){
		$('.userlist').show();
		$('.kefu').hide();
	}else{
		$('.userlist').hide();
		$('.kefu').show();
	}
});


$('.jumpc').click(function(){
	var href = $(this).attr('attr');
	layer.open({
			//skin: 'layui-layer-nobg',
			type: 2,
			title: false,
			area: ['850px', '525px'],
			shade: ['0.1','#fff'],
			closeBtn: 1,
			shadeClose: true,
			content: href
			
		});
});