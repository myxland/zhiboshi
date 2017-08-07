if(typeof(WebSocket)!=='function'){
	
	$('#chat_info').html('<div class="connect_info">浏览器版本过低,webSocket无法连接,请升级浏览器或切换极速模式！</div>');
	
}else if(typeof localStorage!=='object'){
	
		$('#chat_info').html('<div class="connect_info">浏览器版本过低,无法使用localStorage,请升级浏览器或切换极速模式！</div>');
	
}else{
	
	//获取用户信息 
	$.post(isLogin,function(data){
		
		//设置用户信息
		localStorage.setItem('user',data);

		data = JSON.parse(data);
		
		var play1 = localStorage.getItem('play_youke');
		
		var play2 = localStorage.getItem('play_huiyuan');
		
		
		if(data['level']==0){
			
			if(play1==''||play1==null){
				
				localStorage.setItem('play_youke',1000*10);
				
			}else if(play1==0){
				
				$('.zhibo-wrap').css('display','block');
				
			}
				
			var play_time = localStorage.getItem('play_youke');
				
			restrictPlay(play_time,'youke');
				
			
			
			
		}else if(data['level']==1){
			
			if(play2==''||play2==null){
				
				localStorage.setItem('play_huiyuan',1000*12);
				
			}else if(play2==0){
				
				$('.zhibo-wrap').css('display','block');
				
			}
				
			var play_time = localStorage.getItem('play_huiyuan');
				
			restrictPlay(play_time,'huiyuan');
				
			
		}
		
		WS();
	});
	
	
}



function WS(){
	ws = new WebSocket('ws://127.0.0.1:2346');
	//$('#chat_info').append('<div class="connect_info">系统消息：服务器连接中...</div>');
	
	//连接成功
	ws.onopen = function(){
		
		//$('#chat_info').append('<div class="connect_info">系统消息：连接成功...</div>');
		
		var arr = JSON.parse(localStorage.getItem('user'));
		var msg = '{"name":"'+arr['name']+'","id":"'+arr['id']+'","level":"'+arr['level']+'","msg" : "login","icon":"'+arr['icon']+'","kefu":"'+arr['kefu']+'"}';
        ws.send( msg );
	};
	
	//处理消息
	ws.onmessage = function(e){
			
			e = JSON.parse(e.data);
			if(e.level>6){
				var sty = 'color:red;';
			}else{
				var sty = '';
			}
			e.content = unescape(e.content);
			switch(e['msg']){
				case 'login':
					//更新在线用户
					saveMember(e);
					break;
				case 'sendInfo':
					var cont = $('#chat_info').html();
					var icon = '<img src="'+imgLink+'user'+e.level+'.png" class="msg_group_ico" title="会员 -注册用户">';
					var info = '<div id="'+e.chatid+'" class="msg notmine "><div class="msg_head">'+icon+'</div><div class="msg_content"><div><font class="u">'+e.name+'</font>&nbsp;&nbsp; <font class="date">'+e.time+'</font></div><div class="layim_chatsay"><font style="font-size:13px;'+sty+'">'+e.content+'</font></div></div></div>';
					cont += info;
					$('#chat_info').html(cont);
					$('.chat').scrollTop( $('.chat').prop("scrollHeight"));
					
					//显示桌面通知
					notify(e.icon,e.name,e.content);
					break;
				case 'onlineNumber':
					$('#renshu').html('在线人数：'+e.num);
					break;
				case 'check':
					
					//显示桌面通知
					notify(e.icon,e.name,e.content);
					
					e.content = escape(e.content);
					var cont = $('#chat_info').html();
					var icon = '<img src="'+imgLink+'user'+e.level+'.png" class="msg_group_ico" title="会员 -注册用户">';
					var info = '<div id="'+e.chatid+'" class="msg notmine "><div class="msg_head">'+icon+'</div><div class="msg_content"><div><font class="u">'+e.name+'</font>&nbsp;&nbsp; <font class="date">'+e.time+'</font><a class="shenhe1" id="shenhe1" href="javascript:check_msg_yes('+e.chatid+')"></a><a class="shenhe2" id="shenhe2" href="javascript:check_msg_no('+e.chatid+')"></a></div><div class="layim_chatsay"><font style="font-size:13px;'+sty+'">'+unescape(e.content)+'</font></div></div></div>'+"<input id='input"+e.chatid+"' value='"+JSON.stringify(e)+"' type='hidden' />";
					cont += info;
					$('#chat_info').html(cont);
					$('.chat').scrollTop( $('.chat').prop("scrollHeight"));
					break;
				case 'audit':
					var cont = $('#chat_info').html();
					var icon = '<img src="'+imgLink+'user'+e.level+'.png" class="msg_group_ico" title="会员 -注册用户">';
					var info = '<div id="'+e.chatid+'" class="msg notmine "><div class="msg_head">'+icon+'</div><div class="msg_content"><div><font class="u">'+e.name+'</font>&nbsp;&nbsp; <font class="date">'+e.time+'</font></div><div class="layim_chatsay"><font style="font-size:13px;">'+e.content+'</font></div></div></div>';
					cont += info;
					$('#chat_info').html(cont);
					$('.chat').scrollTop( $('.chat').prop("scrollHeight"));
					break;
				case 'audit_admin':
					$('#'+e.chatid+' #shenhe1').remove();
					break;
				case 'delMsg':
					$('#'+e.chatid).remove();
					break;
				case 'kefu':
					if(e['status']=='lixian'){
						console.log('没有一个客服在线...');
					}else if(e['status']=='allot'){
						var user = localStorage.getItem('user');
						user = JSON.parse(user);
						kefu(e,user['kefu']);	
					}else if(e['status']=='out'){
						alert('该客服不在线');
					}
					break;
				case 'jiancang':
					var icon = '<img src="'+imgLink+'user8.png" class="msg_group_ico" title="系统消息">';
					var info = '<div class="msg notmine "><div class="msg_head">'+icon+'</div><div class="msg_content"><div><font class="u">'+e.name+'</font>&nbsp;&nbsp; <font class="date">'+e.time+'</font></div><div class="layim_chatsay"><font style="font-size:14px;color:red;">'+unescape(e.content)+'</font></div></div></div>';
				
					$('#chat_info').append(info);
					$('.chat').scrollTop( $('.chat').prop("scrollHeight"));
					
					//播放音频
					playMusic(e.music);
					break;
			}
			
	}
	
	//连接失败
	ws.onerror = function(){
		//$('#chat_info').append('<div class="connect_info">系统消息：连接失败...</div>');
		layer.msg('workerman连接失败',{time:4000});
	}	
}


//审核发言 yes
function check_msg_yes(id){
	
	//查询发言并返回
	var msg = $('#input'+id).val();
	msg = JSON.parse(msg);
	msg['msg'] = 'audit';
	msg = JSON.stringify(msg);
	
	$.post(editMsg,{id:id},function(data){
		
		if(data==1){
			$('#'+id+' #shenhe1').remove();
			ws.send(msg);
		}else{
			alert('已经审核');
		}
		
		
	});
	
}


//审核发言 no
function check_msg_no(id){
	
	//查询发言并返回
	var msg = $('#input'+id).val();
	msg = JSON.parse(msg);
	msg['msg'] = 'delMsg';
	msg = JSON.stringify(msg);
	
	$.post(delMsg,{id:id},function(data){
		
		if(data==1){
			ws.send(msg);
		}else{
			alert('已经删除');
		}
		
		
	});
	
}

//转换数组
function objToArr(o){
	
	var arr = new Array();
	
	for(var item in o){
        arr.push(o[item]);
    }
	
	return arr;
}


function saveMember(e){
	
	var arr ='';
	for(var i in e){
		var id = e[i].id;
		if(id){
			var _html = '<li id="ulist'+e[i].id+'"><img src="'+e[i].icon+'" width="30px" height="30px"><span>'+e[i].name+'</span><img class="userimage" src="/room/images/user'+e[i].level+'.png" alt=""></li>';
			arr += _html;
		}
	}
	$('.userlist').html(arr)
	
}


function playMusic(e){
	
	var au = document.createElement("audio");
	au.preload="auto";
	au.src = imgLink+e;
    au.play();

	
}


function restrictPlay(time,type){
	console.log(time);
	var restrict_play = setInterval(function(){
		
		if(time==0){
			$('.zhibo-wrap').css('display','block');
			clearInterval(restrict_play);
			return false;
		}
		
		time -= 1000;

		var second = time/1000%60>=10?time/1000%60:'0'+time/1000%60;
		var minute = Math.floor(time/1000/60%60)>=10?Math.floor(time/1000/60%60):'0'+Math.floor(time/1000/60%60);
		var hour   = Math.floor(time/1000/60/60%24);
		var day    = Math.floor(time/1000/60/60/24);
		
		
		$('#second').html(second);
		$('#minute').html(minute);
		$('#hour').html('0'+hour);
		$('#day').html('0'+day);
		
		
		localStorage.setItem('play_'+type,time);
		
		
	},1000);

}

function notify(i,n,c){
	
	i = 'http://'+location.host+i;
	
	//判断支持notify
	var flag = Notifier.HasSupport();
	
	if(flag){
		//获取桌面通知权限
		Notifier.RequestPermission();
		//超时时间
		Notifier.ModelTimeout(3);
		//发送消息
		Notifier.Notify(i, n, c);
		
	}
	
	
}
