
function kefu(e,type){
	
	var user = localStorage.getItem('user');

	user = JSON.parse(user);
	if(type==0){
		layui.use('layim', function(layim){
		
		  //基础配置
		  layim.config({
			
			
			init: {
			//我的信息
				"mine": {
				  "username": user['name'] //我的昵称
				  ,"id": user['id'] //我的ID
				  ,"status": "online" //在线状态 online：在线、hide：隐身
				  ,"sign": "" //我的签名
				  ,"avatar": user['icon'] //我的头像
				}
			} 
			
			
			
			,brief:true
			,title:'客服'
			,minRight:'1400px'
			,initSkin:'5.jpg'
		 
			
			
		  }).chat({
			name: e.name
			,type: 'friend'
			,avatar: e.icon
			,id: e.id
		  });
		  
		  
		  layim.on('sendMessage', function(res){
				
				var mine = res.mine;
				var to   = res.to;
				mine['msg'] = 'kefu';
				mine['kid'] = to['id'];
				mine = JSON.stringify(mine);
				
				ws.send(mine);
				
		  
			});  
			
			ws.onmessage = function(e){
				e = JSON.parse(e.data);
				switch(e['msg']){
					case 'kefu':
						if(e['status']=='ok'){
							
							layim.getMessage({
							  username: e.username //消息来源用户名
							  ,avatar: e.avatar //消息来源用户头像
							  ,id: e.id //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
							  ,type: "friend" //聊天窗口来源类型，从发送消息传递的to里面获取
							  ,content: e.content //消息内容
							  //,cid: 0 //消息id，可不传。除非你要对消息进行一些操作（如撤回）
							  ,mine: false //是否我发送的消息，如果为true，则会显示在右方
							  ,fromid: e.id //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
							  //,timestamp: e.time //服务端动态时间戳
							});
						}
						break;
						
				}
			}
			
			layim.setChatMin();
			
		}); 
	}else{
		layui.use('layim', function(layim){
		
		  //基础配置
		  layim.config({
			
			
			init: {
			//我的信息
				"mine": {
				  "username": user['name'] //我的昵称
				  ,"id": user['id'] //我的ID
				  ,"status": "online" //在线状态 online：在线、hide：隐身
				  ,"sign": "" //我的签名
				  ,"avatar": user['icon'] //我的头像
				}
			} 
			
			
			
			,brief:true
			,title:'客服'
			,minRight:'1400px'
			,initSkin:'5.jpg'
		 
			
			
		  });
		  
		  
		  layim.on('sendMessage', function(res){
				
				var mine = res.mine;
				var to   = res.to;
				mine['msg'] = 'kefu';
				mine['kid'] = to['id'];
				mine = JSON.stringify(mine);
				
				ws.send(mine);
				
		  
			});  
			
			ws.onmessage = function(e){
				e = JSON.parse(e.data);
				switch(e['msg']){
					case 'kefu':
						layer.msg(e.username+'来新消息了',{time:2000});
						if(e['status']=='ok'){
							
							layim.getMessage({
							  username: e.username //消息来源用户名
							  ,avatar: e.avatar //消息来源用户头像
							  ,id: e.id //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
							  ,type: "friend" //聊天窗口来源类型，从发送消息传递的to里面获取
							  ,content: e.content //消息内容
							  //,cid: 0 //消息id，可不传。除非你要对消息进行一些操作（如撤回）
							  ,mine: false //是否我发送的消息，如果为true，则会显示在右方
							  ,fromid: e.id //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
							  //,timestamp: e.time //服务端动态时间戳
							});
						}
						break;
						
				}
			}
			
			layim.setChatMin();
			
		}); 
	}
	  
	

}

     