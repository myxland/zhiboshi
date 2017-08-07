
function thisMovie(movieName) 
{
	if (navigator.appName.indexOf("Microsoft") != -1)
		return window[movieName];
	else 
		return document[movieName];
}
var t=0;

function XHConn() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) { 
  	    try {
  		    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  	    } catch (e) {
  		    try {
  			    xmlhttp = new XMLHttpRequest();
  		    } catch (e) {
  			    xmlhttp = false;
  		    }
  	    }
    }
  
    return xmlhttp;
}
function playSound(file){
	//getId('MsgSound').innerHTML='<embed src=/room/sounds/9.mp3 width=0 height=0 loop=-1>';
        getId('MsgSound').innerHTML='<audio controls="controls" autoplay="autoplay"><source src="/room/sounds/'+file+'" type="audio/mpeg">你的浏览器还不支持哦</audio>';
}
function interfaceInit()
{

POPChat=(function(){
	var list=[];
	var user=null;
	var win=null;
	return{
		Init:function(){
			var html = '<div class="layim_chatbox" id="layim_chatbox">'
            +'<h6>'
            +'<span class="layim_move"></span>'
            +'    <a href="javascript:void(0)" class="layim_face" target="_blank"><img src="" ></a>'
            +'    <a href="javascript:void(0)" class="layim_names" target="_blank">聊天窗口</a>'
            +'    <a href="javascript:void(0)" class="layim_qq" target="_blank"></a>'
            +'    <span class="layim_rightbtn">'
            +'        <!--<i class="layer_setmin"></i>-->'
            +'        <i class="layim_close"></i>'
            +'    </span>'
            +'</h6>'
            +'<div class="layim_chatmore" id="layim_chatmore">'
            +'    <ul class="layim_chatlist"></ul>'
            +'</div>'
            +'<div class="layim_groups" id="layim_groups"><h4 class="title">介绍</h4><div id="whisperProfile"></div><div id="userpic"></div></div>'
            +'<div class="layim_chat">'
            +'    <div class="layim_chatarea" id="layim_chatarea">'
            +'        <ul class="layim_chatview layim_chatthis"  id="layim_area"></ul>'
            +'    </div>'
            +'    <div class="layim_tool">'
            +'        <i class="layim_addface" title="发送表情" onclick="showFacePanel(this,\'#layim_write\');"onclick="showFacePanel(this,\'#layim_write\');"></i>'
            +'        <a href="javascript:;"><i class="layim_addimage" title="发送图片" onclick="bt_insertImg(\'#layim_write\')" ></i></a>'
            +'        <!--<a href="javascript:;"><i class="layim_addfile" title="上传附件"></i></a>-->'
            +'        <!--<a href="" target="_blank" class="layim_seechatlog"><i></i>聊天记录</a>-->'
            +'    </div>'
            +'    <div class="layim_write" id="layim_write" contentEditable="true" ></div>'
            +'    <div class="layim_send">'
            +'        <div class="layim_sendbtn" id="layim_sendbtn">发送<!--<span class="layim_enter" id="layim_enter"><em class="layim_zero"></em></span>--></div>'
            +'        <div class="layim_sendtype" id="layim_sendtype">'
            +'            <span><i>√</i>按Enter键发送</span>'
            +'            <span><i></i>按Ctrl+Enter键发送</span>'
            +'        </div>'
            +'    </div>'
            +'</div>'
            +'</div>';
		layer.open({
    	type: 1, 
        moveType: 1,
		shade: false,
		area: ['800px', '493px'],
        move: '.layim_chatbox .layim_move',
        title: false,
       skin: 'nuoyun-layim',
		closeBtn: false,
    	content: html,
		success: function(layero){
				
				win=layero;
				
                $('.layim_close').on('click', function(){
					  	layero.hide();
        		});
				$('#openPOPChat').on('click', function(){
                                   if(win.find('.layim_chatlist li').length<1){
                                                      $("#layim_chatmore").hide();
                                                      $(".layim_chatbox h6").css("margin-left","0px");
                                                     $(".nuoyun-layim").css("width","600px");
                                                      $(".layim_chatbox").css("width","600px");
                                                     
                                                }
					  	layero.show();
        		});
				win.find('#layim_chatmore').on('click', 'li em', function(){
						user=null;
						$("#layim_user"+$(this).attr('data-id')).remove();
						$("#layim_area"+$(this).attr('data-id')).remove();
						var find_li=win.find('.layim_chatlist li');
						if(find_li.length<1){
                                                   layero.hide();
                                                     
                                                }
						if(find_li.length>0){
								var li=find_li.first();
								POPChat.showtab({chatid:li.attr('data-id'),nick:li.attr('data-nick')});
						}
						return false;
						
        		});
				win.find('#layim_chatmore').on('click', 'li', function(){
            			var othis = $(this);
           				POPChat.showtab({chatid:othis.attr('data-id'),nick:othis.attr('data-nick')});
        		});
				
								
				
				win.find("#layim_sendbtn").on('click', POPChat.send);
				win.find("#layim_write").keyup(function(e){
					if(e.keyCode === 13){
						POPChat.send();
						return false;
					}
				});
				layero.hide();
            }
		
		});
		
		},
		send:function(){
			if(user==null)return;
			var toUserInfo=UserList.get(user.chatid);
			if(typeof(toUserInfo)=="undefined"||user.chatid.indexOf('x_r')>-1){alert('用户离线');return;}
			var msg=encodeURIComponent($("#layim_write").html().str_replace().replace("<br>",""));
			//var str='SendMsg=M='+user.chatid+'|true|color:#000|'+msg;
                        if($.trim(msg)=='')return;
			 var str = '{"type":"SendMsg","ToChatId":"'+user.chatid+'","IsPersonal":"true","Style":"","tanmu":"false","Txt":"'+msg+'"}';
	ws.send(str);
			PutMessage(My.rid,My.chatid,toUserInfo.chatid,My.nick,toUserInfo.nick,'true','',msg,'');
			
			win.find("#layim_write").html("");
			win.find("#layim_write").focus();
			MsgCAlert();
		},
		newtab:function(u){
			var layim_chatmore = win.find('#layim_chatmore');
        	var layim_chatarea = win.find('#layim_chatarea');
			
			if(win.find('#layim_user'+u.chatid).length<1){
				layim_chatmore.find('ul>li').removeClass('layim_chatnow');
       			layim_chatmore.find('ul').append('<li data-qq="" data-id="'+ u.chatid +'" data-nick="'+u.nick+'" id="layim_user' +u.chatid +'" class="layim_chatnow"><img src="../face/img.php?t=p1&u='+u.chatid+'"><span><b class="layim_msgnum">0</b>'+ u.nick +'</span><em  data-id="'+ u.chatid +'">×</em></li>');
                        if(win.find('.layim_chatlist li').length>0){
                                                      $("#layim_chatmore").show();
                                                      $(".layim_chatbox h6").css("margin-left","200px");
                                                     $(".nuoyun-layim").css("width","800px");
                                                      $(".layim_chatbox").css("width","800px");
                                                     
                                                }else{
                                                     $("#layim_chatmore").hide();
                                                      $(".layim_chatbox h6").css("margin-left","0px");
                                                     $(".nuoyun-layim").css("width","600px");
                                                      $(".layim_chatbox").css("width","600px");
                                                    
                                                }
				layim_chatarea.find('.layim_chatview').removeClass('layim_chatthis');
        		layim_chatarea.append('<ul class="layim_chatview layim_chatthis" id="layim_area'+ u.chatid +'"></ul>');

				$.ajax({type:'GET',dataType:'JSON',url:'../ajax.php?act=mymsgold&tuid='+u.chatid,
				success:function(data){
					$("#layim_area"+ data.tuid).prepend(data.msg);
					
					
					$("#layim_user"+data.tuid).attr('data-qq',data.realname);
					win.find('.layim_qq').html("<span><a onclick='add_QQ("+data.realname+")'><img src='./images/icon_qq.png' border=0>"+data.realname+"</a></span>");
					if(data.realname!=""&&data.realname!='0'){
						win.find('.layim_names').css("line-height",'20px');
						win.find('.layim_qq').show();
					}else{
						win.find('.layim_names').css("line-height",'40px');
						win.find('.layim_qq').hide();
					}
                                        u=UserList.get(u.chatid)
				if(u!=undefined&&u.mood!=""){
					var str='<li class="layim_chatehe"><div class="layim_chatuser"><img src="../face/img.php?t=p1&u='+u.chatid+'"><span class="layim_chatname">'+u.nick+'</span><span class="layim_chattime">'+Datetime(0)+'</span></div><div class="layim_chatsay"><font>'+u.mood+'</font><em class="layim_zero"></em></div></li>';
					$("#layim_area"+ u.chatid).append(str);
				}
                                win.find('#layim_area'+ data.tuid).scrollTop(win.find('#layim_area'+ data.tuid)[0].scrollHeight);
				}});
				
				
			}
			
			
			win.show();
			if(layim_chatmore.find('li').length<2){
				
				POPChat.showtab(u);
			}
		},
		showtab:function(u){
			user=u;
                       
			var layim_chatmore = win.find('#layim_chatmore');
        	var layim_chatarea = win.find('#layim_chatarea');
			
			layim_chatmore.find('ul>li').removeClass('layim_chatnow');
			layim_chatarea.find('.layim_chatview').removeClass('layim_chatthis');
				
			win.find('#layim_user'+u.chatid).addClass('layim_chatnow');
			win.find('#layim_area'+u.chatid).addClass('layim_chatthis');
			
			
			win.find('.layim_chatnow .layim_msgnum').text("0");
			win.find('.layim_chatnow .layim_msgnum').hide();
			
			win.find('.layim_face>img').attr('src', '../face/img.php?t=p1&u='+u.chatid);
    		win.find('.layim_names').text(u.nick);
                win.find('#whisperProfile').text(u.mood);
	     u.color!='0' &&   win.find('#userpic').html('<img src="../face/img.php?t=p2&u='+u.chatid+'">');
			win.show();
			win.find('#layim_area'+ u.chatid).scrollTop(win.find('#layim_area'+ u.chatid)[0].scrollHeight);
			
			win.find('.layim_qq').html("<span><a onclick='add_QQ("+$("#layim_user"+u.chatid).attr('data-qq')+")'><img src='./images/icon_qq.png' border=0>"+$("#layim_user"+u.chatid).attr('data-qq')+"</a>");
			
			if($("#layim_user"+u.chatid).attr('data-qq')!=""&&$("#layim_user"+u.chatid).attr('data-qq')!='0'){
						win.find('.layim_names').css("line-height",'20px');
						win.find('.layim_qq').show();
					}else{
						win.find('.layim_names').css("line-height",'40px');
						win.find('.layim_qq').hide();
			}
		},
		showmsg:function(u,u1,str){
			if(user.chatid!=u.chatid&&u.chatid!=My.chatid){
				win.find('#layim_user'+u.chatid+' .layim_msgnum').show();
				win.find('#layim_user'+u.chatid+' .layim_msgnum').text(Number(win.find('#layim_user'+u.chatid+' .layim_msgnum').text())+1+"");	
			}
			var log = {};
			if(u.chatid==My.chatid)
				log.imarea = win.find('#layim_area'+ u1.chatid);
			else
				log.imarea = win.find('#layim_area'+ u.chatid);
			log.html = function(param, type){
                return '<li class="'+ (type === 'me' ? 'layim_chateme' : ' layim_chatehe') +'">'
                    +'<div class="layim_chatuser">'
                        + function(){
                            if(type === 'me'){
                                return '<span class="layim_chattime">'+ param.time +'</span>'
                                       +'<span class="layim_chatname">'+ param.name +'</span>'
                                       +'<img src="'+ param.face +'" >';
                            } else {
                                return '<img src="'+ param.face +'" >'
                                       +'<span class="layim_chatname">'+ param.name +'</span>'
                                       +'<span class="layim_chattime">'+ param.time +'</span>';      
                            }
                        }()
                    +'</div>'
                    +'<div class="layim_chatsay">'+ param.content +'<em class="layim_zero"></em></div>'
                +'</li>';
            };
			log.imarea.append(log.html({
                time: Datetime(0),
                name: u.nick,
                face: '../face/img.php?t=p1&u='+u.chatid,
                content: str
            },u.chatid==My.chatid?'me':""));
			log.imarea.scrollTop(log.imarea[0].scrollHeight);
			//if(win.find('.layim_chatnow').attr('data-id'))
		}
	}
})();

UserList=(function(){
	var list=[];
	var OnLineUser=getId('OnLineUser');
	var OnlineUserNum=getId('OnlineUserNum');
	var OnlineOtherNum=getId('OnlineOtherNum');
	var PInfo=CreateElm(false,'div','','PInfo');
	var hold = 0;
	var show = 0;
	var onlinuser=0;
	var onlinmyuser=0;
	var def_list=$('#OnLineUser').html();
	list['ALL']={sex:2,chatid:'ALL',nick:'大家'}
	return{
		List:function(){return list},
                 setrebotnum:function(num){onlinuser=onlinuser+num;OnlineUserNum.innerHTML=onlinuser;},
		init:function(){
			list=[];
			//OnLineUser.innerHTML='';
			OnlineUserNum.innerHTML='';
			list['ALL']={sex:2,chatid:'ALL',nick:'大家'}
			//UserList.add(My.chatid,My);
						//获取rebots在线列表
			var request_url='../ajax.php?act=robotlist&rid='+My.rid+'&r='+RoomInfo.r+'&'+Math.random() * 10000;
			$.ajax({type: 'get',url:request_url,success:function(data){WriteMessage2(data);}});
			},
		get:function(id){return list[id];},
                delmyuser:function(id){
			var u=UserList.get(id);
			if(u==undefined)return;
			if(My.color=='3'&&u.vip==My.name){
				$("#group_myuser").find("#myuser"+id).remove();
				onlinmyuser--;
				OnlineOtherNum.innerHTML=onlinmyuser;
			}
		},
                addmyuser:function(u){
                    var ref=getId("group_myuser");
					if($("#group_myuser").find("#myuser"+u.chatid).length>0)
					{
						$("#group_myuser").find("#myuser"+u.chatid).remove();
						onlinmyuser--;
					}
					var li=CreateElm1(ref,'li',false,'myuser'+u.chatid,null);
					var vip_ico="<img src='"+grouparr[u.color].ico+"'  align='top'/ title='"+grouparr[u.color].title+'-'+grouparr[u.color].sn+"'>"; 
					var iscam='<span class="vipico">'+vip_ico+'</span>';
					if(u.cam!=0){
					li.innerHTML='<a href="javascript:void(0)"><font style="color:#FFF">'
					 +iscam
					 +'<cite><img src="/face/p1/'+u.chatid+'.gif" border="0" class="head"/></cite>'
                                          +'<dt><font id="cnick_'+u.chatid+'">'+u.nick+'</font> &nbsp;<code> </code></dt>'
					 +'<dl> </dl>'
					 +'</font></a>';}else{
                                         li.innerHTML='<a href="javascript:void(0)"><font style="color:#FFF">'
					 +iscam
					 +'<cite><img src="/face/p1/null.jpg" border="0" class="head"/></cite>'
                                          +'<dt><font id="cnick_'+u.chatid+'">'+u.nick+'</font> &nbsp;<code> </code></dt>'
					 +'<dl> </dl>'
					 +'</font></a>';
                                     
                                         }
					if(u.color=='3' && My.color!='3'){
					 $("#group_myuser").append("<div class='kfbtns'> <a class='btn1' ><i class='fa fa-comments'></i>在线私聊</a> <a href='http://wpa.qq.com/msgrd?v=3&amp;uin="+u.qq+"&amp;site=qq&amp;menu=yes' class='btn2' target='_blank'><i class='fa fa-qq'></i>QQ交谈</a> </div>"); 
                                        $("#group_myuser").append('<h4 class="title MyKf">助理介绍</h4>');
                                         $("#group_myuser").append('<div class="border-top MyKf" id="MyKfProfile">'+u.mood+'</div>')
                                         $('.kfbtns').find('.btn1').click(function(){if(u.chatid!=My.chatid||u.chatid.indexOf('x_r')<0){POPChat.newtab(u);POPChat.showtab(u);}return false;});
		                       li.ondblclick=function(){if(u.chatid!=My.chatid||u.chatid.indexOf('x_r')<0){POPChat.newtab(u);POPChat.showtab(u);}} 			
                                       }else{
                                         li.oncontextmenu=function(){UserList.menu_kf(u);return false;}
					li.onclick=function(){ToUser.set(u.chatid,u.nick);/*openWin(2,false,'profiles.php?uid='+u.chatid,460,600);*/}
					li.ondblclick=function(){if(u.chatid!=My.chatid||u.chatid.indexOf('x_r')<0){POPChat.newtab(u);POPChat.showtab(u);}}   
                                            
                                        }
					    if(UserList.get(u.chatid)==undefined){$(li).find('a').addClass('gray');}
					else{
						$('#group_myuser').prepend($(li));
						$(li).find('dt').css("color","red");
						
					}
                                        onlinmyuser++;
					OnlineOtherNum.innerHTML=onlinmyuser;
				},
		getmylist:function(user){
			
			$.ajax({type: 'get',dataType:'json',url: '../ajax.php?act=getmylist&rid='+My.rid+'&user='+encodeURIComponent(My.name),
			success:function(data){
				//alert(data);
				
				
				var ref=getId("group_myuser");
				$('#group_myuser').html('');
				onlinmyuser=0;
				if(data.state=='true'){
				for(var key in data.row){
					
					var u=data.row[key];
					if($("#myuser"+u.chatid)[0]==undefined){
				
					UserList.addmyuser(u);	
					}					
				}
				}
                                if(My.color==3){
				for(var k in list){
					if(typeof(list[k].vip)!="undefined"){
						if(My.name==list[k].vip){
					
                                                UserList.addmyuser(list[k]);
						}
					}
				}
                            }
				//未分配随机选一个在线客服 发起私聊
                               
				if($('#group_3').find('li').length>0&&My.color!='3'&&My.fuser==""&&$('#group_myuser').find('li').length<=0){
                           
					var key=parseInt($('#group_3').find('li').length*Math.random()); 
					var tmp_u=UserList.get($($('#group_3').find('li')[key]).attr('id'));
                                           
					if(tmp_u!=undefined){
                                         
						
						
                                                $.get('../ajax.php?act=remyfuser&fuserid='+tmp_u.chatid);
                                               
						POPChat.newtab(tmp_u);
						POPChat.showtab(tmp_u);
						tmp_u.gid=tmp_u.color;
                                                
						UserList.addmyuser(tmp_u);
						
					}
				
				}
				//游客主动私聊
				if(onlinmyuser>0&&My.color=="0"&&UserList.get($($('#group_myuser').find('li')[0]).attr("id").replace('myuser',''))!=undefined){
					$($('#group_myuser').find('li')[0]).dblclick();
				}
			
			}
				
			});
		},
		add:function(id,u){
			if($("#"+id).length >0)return;
			var style="";
			var vip_ico="";
                        var r_color='';
                        var li_class=false;
			vip_ico="<img src='"+grouparr[u.color].ico+"'  align='top'/ title='"+grouparr[u.color].title+'-'+grouparr[u.color].sn+"'>"; 
			
			onlinuser++;
			OnlineUserNum.innerHTML=onlinuser;
			
			var ref=getId("group_rebots");
			if(My.chatid==u.chatid){
				ref=getId("group_my");
				
			}
			else
			{
				ref=getId("group_"+u.color);
			}
			
			
			list[id]=u;
			if(My.qx==1 && u.chatid.indexOf("x_r")>=0 ){r_color='color="#ccccc9"';li_class='rebots';}
			var li=CreateElm1(ref,'li',li_class,id,null);
                        
			//$("#"+id).css("opacity","0");
			//$("#"+id).animate({"opacity":"1"},2000);
			//list[id]=u;
			//var li=CreateElm(OnLineUser,'li',false,id);
			var iscam='<span class="vipico"><img src="room/images/state'+u.state+'.png" border="0" class="state" id="state'+id+'"/>'+vip_ico+'</span>';
			
			
			
                      if(u.cam!=0){
                          li.innerHTML='<a href="javascript:void(0)"><font style="color:#FFF">'
			 +iscam
                        // +'<cite><img src="../face/img.php?t=p1&u='+u.chatid+'" border="0" class="head" id="head_'+id+'"/></cite>'
                        +'<cite><img src="/face/p1/'+u.chatid+'.gif" border="0" class="head" id="head_'+id+'"/></cite>' 
                        +'<dt><font '+r_color+' id="cnick'+id+'">'+u.nick+'</font> &nbsp;<code>'+u.mood+'</code></dt>'
			 +'<dl>'+u.mood+'</dl>'
      		         +'</font></a>';
                     }else{
                          li.innerHTML='<a href="javascript:void(0)"><font style="color:#FFF">'
			 +iscam
                       +'<cite><img src="/face/p1/null.jpg" border="0" class="head" id="head_'+id+'"/></cite>'
                        +'<dt><font  '+r_color+' id="cnick'+id+'">'+u.nick+'</font> &nbsp;<code>'+u.mood+'</code></dt>'
			 +'<dl>'+u.mood+'</dl>'
      		        +'</font></a>';
               }
                     
      		
			li.oncontextmenu=function(){UserList.menu(u);return false;}
			li.onclick=function(){if(!check_auth("msg_ptp")){return;}ToUser.set(u.chatid,u.nick);}
			li.ondblclick=function(){if(!check_auth("msg_priv")){layer.msg('没有私聊权限！',{icon: 5,shift: 6,time:1000});return;}if(u.chatid!=My.chatid&&u.chatid.indexOf('x_r')<0){POPChat.newtab(u);POPChat.showtab(u);}}
			
                        if(My.name==u.vip&&My.color=='3'){
				UserList.addmyuser(u);
			}
			
		},
		setstate:function(id,state,automsg){
			list[id].state=state;
			getId(id).title=automsg;
			getId('state'+id).src="room/images/state"+state+".png";
                   
                       // $("#cnick"+id).append("屏蔽"); 

		},
		del:function(id,u){ 
                     UserList.delmyuser(id);
			if(id==My.chatid)return;
			delete(list[id]);
			onlinuser--;
			OnlineUserNum.innerHTML=onlinuser;
			RemoveElm(OnLineUser,getId(id));
			//ToUser.del(id);
		},
		info:function(id){
			show = setTimeout(function(){UserList.showInfo(id)},0);
		},
		showInfo:function(id){
			if(hold)clearTimeout(hold);
			var u=this.get(id);
			
			var t=getXY(getId(id));
			PInfo.style.top=t[0]-142+'px';
			PInfo.style.left=t[1]+248+'px';
			//PInfo.innerHTML='Login:'+u.roomid+'|'+u.chatid+'|'+u.nick+'|'+u.sex+'|'+u.age+'|'+u.guest+'|'+u.ip+'|'+u.vip+'|'+u.color+'|'+u.cam+'|'+u.headface+'|'+u.state+'|<br><br><br>'+u.automsg;
			var request_url='../ajax.php?act=userinfo&type=json&id='+id+'&'+Math.random() * 10000;
			var xmlhttp=XHConn();
			try{
				xmlhttp.open("GET",request_url,true);
				xmlhttp.send(null);
				xmlhttp.onreadystatechange=function()
				{
					if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
					{
					var UInfo=eval("("+xmlhttp.responseText+")");
					if(My.color>0)uip=" [ <a href='http://www.ip138.com/ips8.asp?ip="+u.ip+"&action=1' target='_blank' title='点击查询地理位置'>"+u.ip+"</a> ]";
					else uip="";
					PInfo.innerHTML='<div style="width:280px; height:150px; padding:6px;" class="info_m">'
					+'<div style="width:100px; height:150px; float:left; margin-right:6px; margin-bottom:6px" class="info_m_l"><img src="../face/img.php?t=p2&u='+id+'" style="width:100px; height:150px;"></div>'
					+'<div style="float:left; width:174px; height:150px; overflow:hidden" class="info_m_r">'
					+'<div><a href="../profile.php?uid='+id+'" target="userinfo"  style="cursor:pointer;color:#06C;">'+UInfo.nick+'</a></div><div style="color:#999" class="info_m_m">'+UInfo.sn+'</div><div class="info_m_">'+UInfo.rank+'</div><div><a href="../profile.php?uid='+id+'" target="userinfo"  style="cursor:pointer;">'+UInfo.yx+'</a></div>'
					+'</div></div><div style="width:292px; height:20px; color:#000" >&nbsp;&nbsp;所在地：'+UInfo.city+uip+'</div>';
					PInfo.style.display = '';
					PInfo.style.cursor='default';
					}
				}
				
			}catch(e){return null;}
			
		},
		infoOver : function(){
			if(hold)clearTimeout(hold);
		},
		infoHold:function(){
			hold = setTimeout(UserList.infoHidden,500);
			PInfo.onmouseover= UserList.infoOver;
			PInfo.onmouseout = UserList.infoHold;
			if(show)clearTimeout(show);
		},
		infoHidden : function(){
			PInfo.style.display = 'none';
		},
		infos:function(id){
			var u=this.get(id);
			alert(u.nick)
		},
		setVideo:function(u){
				SysSend.command('setVideo',My.rid+'_+_'+u.chatid+'_+_'+u.nick);
				getId('menu').style.display='none';
				var xmlhttp=XHConn();
				var request_url="../ajax.php?act=setvideo&vid="+u.chatid+"&rid="+My.rid
				try{
				xmlhttp.open('GET',request_url,true);
				xmlhttp.send(null);
				}
				catch(e) {return true;}
		},
		menu:function(u)
		{ 
                    var xx=0;
			this.infoHidden();
			var UserMenu= Menu.init('120px');
			if(My.chatid==u.chatid)
			{
                            if(u.chatid.indexOf('x')<0){
				UserMenu.add('Manage_view.png','个人资料',function(){getId('menu').style.display='none';openWin(2,false,'room/profiles.php?uid='+u.chatid,460,630);});
                                xx=xx+27;
			     }
			}
			else
			{
			UserMenu.add('Manage_view.png','查看资料',function(){getId('menu').style.display='none';if(!check_auth("user_info")){layer.msg('没有用户资料查看权限！',{shift: 6});return;}openWin(2,false,'room/profiles.php?uid='+u.chatid,460,630);});
                        xx=xx+27;
			
			
			if(check_auth("room_admin"))
				{UserMenu.hr();
                                      UserMenu.add('Manage_Sayto.png','对TA私聊',function(){getId('menu').style.display='none';if(!check_auth("msg_priv")){layer.msg('没有私聊权限！',{shift: 6});return;}if(u.chatid!=My.chatid&&u.chatid.indexOf('x_r')<0){POPChat.newtab(u);POPChat.showtab(u);}} );
                                       xx=xx+27;
					UserMenu.hr();
					UserMenu.add('Manage_Silent.png','禁言',function(){ToUser.set(u.chatid,u.nick);SysSend.command('send_Msgblock','');});
                                        xx=xx+27;
                                        UserMenu.hr();
					UserMenu.add('Manage_Kick.png','踢出、封IP',function(){getId('menu').style.display='none';if(!check_auth("user_kick")){layer.msg('没有用户踢出权限！',{shift: 6});return;}UKick.ShowMb(u);});
                                        xx=xx+27;
					
				}
			}
			var e=getEvent();
			UserMenu.display(e.clientX,e.clientY-xx);
		},
		menu_kf:function(u)
		{
                    var xx=0
			this.infoHidden();
			var UserMenu= Menu.init('120px');
			if(My.chatid==u.chatid)
			{
				UserMenu.add('Manage_view.png','个人资料',function(){getId('menu').style.display='none';openWin(2,false,'room/profiles.php?uid='+u.chatid,460,630);});
                                 xx=xx+27;
			}
			else
			{
			UserMenu.add('Manage_Sayto.png','对TA私聊',function(){getId('menu').style.display='none';if(u.chatid!=My.chatid&&u.chatid.indexOf('x_r')<0){POPChat.newtab(u);POPChat.showtab(u);}} );
                         xx=xx+27;
			
			
			UserMenu.hr();
			UserMenu.add('Manage_view.png','查看资料',function(){getId('menu').style.display='none';openWin(2,false,'room/profiles.php?uid='+u.chatid,460,630);});
                         xx=xx+27;
			
			
			if(check_auth("room_admin"))
				{
					UserMenu.hr();
					UserMenu.add('Manage_Silent.png','禁言',function(){ToUser.set(u.chatid,u.nick);SysSend.command('send_Msgblock','');});
                                         xx=xx+27;
                                        UserMenu.hr();
					UserMenu.add('Manage_Kick.png','踢出、封IP',function(){getId('menu').style.display='none';if(!check_auth("user_kick")){layer.msg('没有用户踢出权限！',{shift: 6});return;}UKick.ShowMb(u);});
                                         xx=xx+27;
				
				}
			}
			var e=getEvent();
			UserMenu.display(e.clientX,e.clientY-xx);
		}
	}
})();
PublicVideo=(function(){
	
})();
UKick=(function(){
	var tiren=0;
	return{
        ShowMb:function(u){
            var loadstr='<div  id="kickmp" onselectstart="return true;">';
            loadstr+='<select name="MCmd" id="MCmd" onchange="if(this.value==\'kick\')getId(\'ktime\').style.display=\'\'"><option value="kick">踢出+封IP</option></select>';
            loadstr+='&nbsp;<select id="ktime" name="ktime"><option value="60">禁闭一小时</option><option value="1440">禁闭一天</option><option value="129600">禁闭3个月</option><option value="1368000">永久禁闭</option></select>';
            loadstr+='<br><br><input type="text" name="cause" id="cause" placeholder="原因" size="24" /><br><button class="bt1" onclick="UKick.SendCmd(\''+u.chatid+'\',\''+u.nick+'\',\''+u.ip+'\')">执行</button>';
            loadstr+='</div>';
            //openWin(1,'踢出 '+u.nick,loadstr,290,200);
            layer.closeAll('iframe'); 
            tiren = layer.open({
                type: 1,
                title: '踢出 '+u.nick,
                shadeClose: true,
                shade: false,
                area: ['290px', '200px'],
                content: loadstr //iframe的url
            });
        },
        SendCmd:function(chatid,nick,ip){
            //ToUser.set(chatid,nick);
            //SysSend.command('kick',getId('ktime').value+'_+_'+getId('cause').value);
              var ktime=getId('ktime').value;
             var cause=getId('cause').value;
            layer.close(tiren);
            if(chatid.indexOf('x_r')>-1){
                layer.msg('机器人不能被踢出！',{
                    shift: 6
                }); 
            }else{ 
               
              
                var str = '{"type":"kickuser","tuid":"'+chatid+'","ktime":"'+ktime+'","cause":"'+cause+'"}';
                ws.send(str);
                $.ajax({
                    type: 'get',
                    dataType:'json',
                    url: '../ajax.php?act=kick&aid='+My.chatid+'&rid='+My.rid+'&ktime='+ktime+'&cause='+encodeURIComponent(cause)+'&ip='+ip+'&tuid='+chatid+'&'+Math.random() * 10000,
                    success:function(data){
                        //alert(data);
                        if(data.state=="yes"){
                            layer.msg(nick+'被踢出！',{
                                shift: 6
                            }); 
                        }
                    }
                });
        
            }
        }
    }
})();
BList=(function(){
	var List=[];
	return{
		init:function(){List=[]},
		add:function(id,u){
			if(BList.isExist(id)){BList.del(id);return;}
			List[id]=u;
			UserList.setstate(id,'00','已经屏蔽消息');
			},
		isExist:function(id){
			var r=false;
			for(key in List){
				if(id==List[key].chatid){return true;}
				}
			return r;
			},
		del:function(id){
			UserList.setstate(id,'0','');
			delete List[id];
			}
		}
})();

ToUser=(function(){

	return{
		id:null,
		name:null,
		add:function(id,name){
		$('#ToUser').html(name);
                $('#ToUser').attr("data-id",id);
                if(id!='ALL'){
		$('#apDiv2').css('display','block');}	
		},
		del:function(id){
			this.add('ALL','大家');
                        $('#apDiv2').css('display','none');
                        
		},
		set:function(id,name){
			if(id==My.chatid)return;
			this.id=id;
			this.name=name;
			this.add(id,name);			
		}
	}
})();

var oldMsg;
var oldTime;
var msgTag=false;
SysSend=(function(){
	return{
		isUser:function()
		{
			//if(ToUser.id.indexOf('x_r')>-1){ToUser.set('ALL','大家');}
			var toUserInfo=UserList.get(ToUser.id);
			if(typeof(toUserInfo)=="undefined"){alert('对方已经离线！');ToUser.del(ToUser.id);return false;}
			//if(ToUser.id=='ALL'){alert('先选择一个网友！');return false;}
			return true;
		},
		msg:function(){
                        if(RoomInfo.banspeak==1){layer.msg('全体禁言中！',{icon: 7,shift: 6});return false;}
			if(!check_auth("msg_send")){layer.msg('没有发言权限！',{icon: 7,shift: 6});return false;}
			if($("#chat_type").val()=="he"&&ToUser.id!="ALL"){SysSend.command('rebotmsg',encodeURIComponent(getId('Msg').innerHTML));return true;}
			
			if(ToUser.id!="ALL")
			if(!this.isUser())return false;
			var toUserInfo=UserList.get(ToUser.id);
			if(toUserInfo.state=='00')alert("注意:"+toUserInfo.nick+' 的消息你已经屏蔽,你将收不到来自ta的消息');
			if(typeof(toUserInfo)=="undefined"){alert('对方已经离线！');ToUser.del(ToUser.id);return false;}
			var Msg=getId('Msg').innerHTML; 
                        //敏感词语审核
	                var reg = new RegExp(msg_unallowable, "ig");
                         if(reg.test(Msg)&&!check_auth("room_admin")){

                       Msg="<div style='clear:both;'></div><div class='msg notmine' ><div class='msg_head'><img src='"+grouparr[My.color].ico+"' class='msg_group_ico' ></div><div class='msg_content'><div><font class='u' >"+My.nick+"</font>&nbsp;&nbsp; <font class='date'>"+Datetime(0)+"</font></div><div class='layim_chatsay'><font >"+Msg+"</font></div></div></div><div style='clear:both;'></div>"
                           getId('Msg').innerHTML='';
                           MsgShow(Msg,0);
                             return;
                         }
			var Style="font-weight:"+getId('Msg').style.fontWeight+";font-style:"+getId('Msg').style.fontStyle+"; text-decoration:"+getId('Msg').style.textDecoration+";color:"+getId('Msg').style.color+"; font-family:"+getId('Msg').style.fontFamily+"; font-size:"+getId('Msg').style.fontSize;
		         var Msg=encodeURIComponent($.trim(Msg.str_replace()));
			if(Msg==oldMsg && My.qx=='0'){alert("请勿刷屏！");getId('Msg').innerHTML='';return;}
			var newTime=new Date().getTime();
			if(newTime-oldTime<500){alert("说话速度过快~歇会儿！");return;}
			if(msgTag){if(newTime-oldTime>5000)msgTag=false;else {alert("说话速度过快~歇会儿！");return;}}
                        if(My.color=="0"){
                        var fayanjiange=parseInt(RoomInfo.fayanjiange+'000');
                        if(newTime-oldTime<fayanjiange){
                            var chaTime=parseInt((fayanjiange-newTime+oldTime)/1000);
                            layer.msg('游客的发言时间间隔为'+RoomInfo.fayanjiange+'秒,还有'+chaTime+'秒!', {icon: 5});
                            return;
                        }   
                            
                        }
			if(Msg!='')
			{  
			  if(tanmuSelect==true){ 
                           My.redbags_num<1?($("#tanmu-select").removeClass('layui-form-onswitch'),tanmuSelect = false,layer.msg('积分不足，弹幕关闭', {icon: 6,anim: 5})):(My.redbags_num=My.redbags_num-1) 
                        }
                        var msgid=randStr()+randStr();
			
			var str = '{"type":"SendMsg","ToChatId":"'+ToUser.id+'","IsPersonal":"'+getId('Personal').value+'","Style":"'+Style+'","tanmu":"'+tanmuSelect+'","Txt":"'+msgid+'_+_'+Msg+'"}';
		ws.send(str);
			
			oldMsg=Msg;
			oldTime=new Date().getTime();
			getId('Msg').innerHTML='';
			getId('Msg').focus();
			PutMessage(My.rid,My.chatid,ToUser.id,My.nick,toUserInfo.nick,getId('Personal').value,Style,Msg,msgid,tanmuSelect);
                     }
			return true;
		},
		command:function(cmd,value){
			var Msg='';
			var IsPersonal='false';
			var Style="font-weight:"+getId('Msg').style.fontWeight+";font-style:"+getId('Msg').style.fontStyle+"; text-decoration:"+getId('Msg').style.textDecoration+";color:"+getId('Msg').style.color+"; font-family:"+getId('Msg').style.fontFamily+"; font-size:"+getId('Msg').style.fontSize;
			switch(cmd)
			{
				case 'setVideoSrc':
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
				break;
                                case 'setVideoover':
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
				break;
                                case 'BanSpeak':
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
				break;
                                case 'sendredbag':
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
				break;
                                 case 'hongbaoinfo':
					Msg+='C0MMAND_+_'+cmd+'_+_'+value+'_+_'+My.nick;
					IsPersonal='false';
                                        var msgid=randStr()+randStr();
                                        var neirong=value.split('_+_');
                                        var str='<div class="message-wrap"><div class="redbag-info1"><p style="color:#333;">'+My.nick+' 领取了 <span style="color:red;">'+neirong[0]+'</span> 的红包获得 <span style="color:red;">'+neirong[1]+'元</span></p></div><div class="clear"></div></div>';
				  PutMessage(My.rid,My.chatid,'hongbao',My.nick,'ALL','false','padding:0px;',str,msgid);
                                break;
                                
				case 'send_Msgblock':
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='true';
				break;
				case 'msgBlock':
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
				break;
				case 'kick':
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='true';
				break;
				case 'magicflash':
					if(this.isUser())
					{
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal=getId('Personal').value;
					}
				break;
                                   case 'rollnotice':
                                      if(check_auth("room_admin")){
                                         Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
                                      }
				break;
                                 case 'handanvideo':
                                      Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
				   break;
                                 case 'msgtip':
                                      if(check_auth("room_admin")){
                                         Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
                                      }
				break;
				case 'requestVideo':
					if(this.isUser())
					{
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='true';
					}
				break;
				case 'setstate':
					//ToUser.id='ALL';
					Msg+='C0MMAND_+_'+cmd+'_+_'+My.chatid+'_+_'+value;
					IsPersonal='false';
				break;
				case 'rebotmsg':
                                    if(ToUser.id.indexOf('x_r')<0){layer.msg('该用户不是机器人！',{shift: 6});return false;}
                                    var msgid=randStr()+randStr();
					Msg+='C0MMAND_+_'+cmd+'_+_'+ToUser.id+'_+_'+value+'_+_'+msgid;
					 var rebotInfo=UserList.get(ToUser.id);
					IsPersonal='false';
					PutMessage(My.rid,ToUser.id,'ALL',ToUser.name,'大家',rebotInfo.color,'font-size:13px',value,msgid);
				break;
				default:
					Msg+='C0MMAND_+_'+cmd+'_+_'+value;
					IsPersonal='false';
					//ToUser.id='ALL';
				break;
			}
			if(Msg!='')
			{	
				var touser=	ToUser.id;		
				if(ToUser.id.indexOf('x_r')>-1){
					touser='ALL';
				}
				//var str='SendMsg=M='+touser+'|'+IsPersonal+'|'+Style+'|'+Msg;
                               var str = '{"type":"SendMsg","ToChatId":"'+touser+'","IsPersonal":"'+IsPersonal+'","Style":"'+Style+'","tanmu":"false","Txt":"'+Msg+'"}'; 
				ws.send(str);
				getId('Msg').innerHTML='';
				getId('Msg').focus();
			}
		}
	}
})();
Menu=(function(){
	var MObj;
	return{
	init:function(w){
		RemoveElm(false,getId('menu'))
		this.MObj=CreateElm(false,'div',false,'menu');
		this.MObj.tabIndex=1;
		this.MObj.style.width=w;
		this.MObj.style.display='none';
		this.MObj.style.zIndex=1;
		return this;
		},
	add:function(icon,txt,fun){
		var n=CreateElm2(this.MObj,'div','out','n');
		n.onmouseout=function(){n.className='out';}
		n.onmouseover=function(){n.className='over';}
		n.innerHTML='<div id="icon" ><img src="room/images/'+icon+'" /></div><span id="txt">'+txt+'</span>';
		n.onclick=fun;
		},
	hr:function(){
		var n=CreateElm2(this.MObj,'div','hr','n');
		n.style.height='1px';
		n.style.fontSize='1px';
		},
	display:function(x,y){
		this.MObj.style.display='';
		this.MObj.style.top=y+'px';
		this.MObj.style.left=x+'px';
		
		this.MObj.focus();
		this.MObj.onblur=function(){BrdBlur('menu');}
		
		}
	}
})();
}
function WriteMessage(txt){
	//if(txt.indexOf('SendMsg')!=-1)
	// alert(txt);
	var Msg;
	try{
		Msg=eval("("+txt+")");
	}catch(e){return;}
	if(Msg.stat!='OK')
	{
		if(Msg.stat=="MaxOnline"){
			document.body.innerHTML='<div  style="font-size:12px; text-align:center; top:100px; position:absolute;width:100%">O.O 对不起，服务端并发数已满！请您联系管理员对系统扩容升级！<br><br></div>';
			return;
		}
		if(Msg.stat=="OtherLogin"){
			location.href="room/error.php?rid="+My.rid+"&type=OtherLogin&msg="+encodeURI('账户在其他地方登录！如不是本人操作，请及时联系客服修改账户密码！')
		}
                if(Msg.stat=="editredbag"){
			$("#MyMoney").val(Msg.money);
		}
                if(Msg.stat=="kickuser"){
                    location.href="room/error.php?msg="+encodeURI('你被踢出！并禁止'+Msg.ktime+'分钟内登陆该房间！<br>原因是 '+Msg.cause+'');
                }
		return ;
	}
	switch(Msg.type)
	{
		case "Ulogin":
			var U=Msg.Ulogin;
			var vip_msg="到来";
			var date= Datetime(0);
			var str='<div style="height:22px; line-height:22px;">欢迎：<font class="u" onclick="ToUser.set(\''+U.chatid+'\',\''+U.nick+'\')">'+U.nick+'</font> <font class="date">'+date+'</font></div>';
			if(My.chatid!=U.chatid){
			UserList.add(U.chatid,U);
			}
                        if(My.color=='3' && My.chatid!=U.chatid && U.vip==My.name && U.chatid.indexOf('x')>-1 ){
                            POPChat.newtab(U);
			    POPChat.showtab(U);
                        }
			var type=0;
			if(U.chatid==My.chatid) type=2;
			//MsgShow(str,type);
			
		break;
		case "UMsg":
			var str=FormatMsg(Msg.UMsg);
			var type=0;
			if(!str)return;
                        //关闭屏蔽功能
			//if(BList.isExist(Msg.UMsg.ChatId))return;
                        if(Msg.UMsg.ToChatId==My.chatid) {type=2;MsgAlert(0);if(audioNotify==true)playSound('9.mp3');}
			
			if(Msg.UMsg.IsPersonal!='true'){
				MsgShow(str,type);
                        if(Msg.UMsg.tanmu=='true'){
                            str=Msg.UMsg.Txt.split('_+_');
                            writeBarrage(decodeURIComponent(str[1]));
                        
                    };
			}
			else
			{
			  if(Msg.UMsg.ToChatId==My.chatid){
                                
                    POPChat.newtab(UserList.get(Msg.UMsg.ChatId));
                    POPChat.showmsg(UserList.get(Msg.UMsg.ChatId),UserList.get(Msg.UMsg.ToChatId),"<font style='"+Msg.UMsg.Style+"'>"+decodeURIComponent(Msg.UMsg.Txt.str_replace())+"</font>");
                }
                if(Msg.UMsg.ChatId==My.chatid){
                                
                    POPChat.newtab(UserList.get(Msg.UMsg.ToChatId));
                    POPChat.showmsg(UserList.get(Msg.UMsg.ChatId),UserList.get(Msg.UMsg.ToChatId),"<font style='"+Msg.UMsg.Style+"'>"+decodeURIComponent(Msg.UMsg.Txt.str_replace())+"</font>");
                }
			}
			
			
			
			
		break;
		case "UonlineUser":
			
			var onlineNum=Msg.roomListUser.length;
			for(i=0;i<onlineNum;i++)
			{
				var U=Msg.roomListUser[i]['client_name'];
			
			UserList.add(U.chatid,U);
			}
                        //在线客服
		UserList.getmylist(My.name);
		break;
		case "Ulogout":
			var U=Msg.Ulogout;
			var date= Datetime(0);
			var str='<div style="height:22px; line-height:22px;">用户：<font class="u" onclick="ToUser.set(\''+U.chatid+'\',\''+U.nick+'\')">'+U.nick+'</font>   离开！ <font class="date">'+date+'</font></div>';
			//MsgShow(str,0);
			UserList.del(U.chatid,U);
		break;
		case "ping":
			ws.send('{"type":"pong"}');
		break;
		case "Sysmsg":
			alert(Msg.Sysmsg.txt);
		break;
	}
	
}
function WriteMessage2(txt){
      var Msg;
	try{
		Msg=eval("("+txt+")");
	}catch(e){return;}
	
	switch(Msg.type)
	{
		
	
		case "UonlineUser":
			var onlineNum=Msg.roomListUser.length;
                        onlineNum>500?UserList.setrebotnum(onlineNum-500):'';
			for(i=0;i<onlineNum;i++)
			{
			var U=Msg.roomListUser[i];
			if(i>=500) return;
			UserList.add(U.chatid,U);
			}
		break;
		case "Ulogout":
			var U=Msg.Ulogout;
			var date= Datetime(0);
			var str='<div style="height:22px; line-height:22px;">用户：<font class="u" onclick="ToUser.set(\''+U.chatid+'\',\''+U.nick+'\')">'+U.nick+'</font>   离开！ <font class="date">'+date+'</font></div>';
			//MsgShow(str,0);
			UserList.del(U.chatid,U);
		break;
		
	}
	
}
function CommObjectCheck(obj, inObj)
{
	if (obj == inObj)
	{
		return true;
	}
	if(obj.parentNode) {
		return CommObjectCheck(obj.parentNode, inObj);
	}
	return false;
}
function CreateElm(pObj,obj,className,id){
	var elm = null;
	var elm=document.createElement(obj);
	if(!pObj)document.body.insertBefore(elm,null);
	else pObj.insertBefore(elm,null);
	if(id)elm.id = id;
	if(className)elm.className = className;
	return elm
}
//CreateElm(this.MObj,'div','out','n')
function CreateElm2(pObj,obj,className,id){
	var elm = null;
	var elm=document.createElement(obj);
        var li1=document.getElementById("menu").firstChild;
	if(!pObj)document.body.insertBefore(elm,li1);
	else pObj.insertBefore(elm,li1);
	if(id)elm.id = id;
	if(className)elm.className = className;
	return elm
}
function CreateElm1(pObj,obj,className,id,ref){
	var elm = null;
	var elm=document.createElement(obj);
	if(!pObj)document.body.insertBefore(elm,ref);
	else pObj.insertBefore(elm,ref);
	if(id)elm.id = id;
	if(className)elm.className = className;
	return elm
}
 

function RemoveElm(pObj,id)
{
	$(id).html("");
	$(id).remove()
}


String.prototype.str_replace=function(t){
	var str=this;

	str= str.replace(/<\/?(?!br|img|font|p|span|\/font|\/p|\/span)[^>]*>/ig,'').replace(/\r?\n/ig,' ').replace(/(&nbsp;)+/ig," ").replace(/(=M=)+/ig,"").replace(/(|)+/ig,"").replace(/(SendMsg)/ig,'');

	return str;
	};
function LinkMaker( str ) {
	return str.replace( /(https?:\/\/[\w.]+[^ \f\n\r\t\v\"\\\<\>\[\]\u2100-\uFFFF]*)|([a-zA-Z_0-9.-]+@[a-zA-Z_0-9.-]+\.\w+)/ig, function( s, v1, v2 ) {
		if ( v2 )
			return [ '<a href="mailto:', v2, '">', v2, '</a>' ].join( "" );
		else
			return [ '<a href="', s, '">', s, '</a>' ].join( "" );
	} );
}
function SwapLink()
{
	if(!isIE)
	getId('Msg').innerHTML=LinkMaker(getId('Msg').innerHTML);
	
	var as=getId('Msg').getElementsByTagName('a');
	for ( var i = as.length - 1; i >= 0; i-- ) {
		as[i].target='_blank';
		as[i].className='MsgUrlStyle';
	}
}
function PutMessage(rid,uid,tid,uname,tname,privacy,style,str,msgid,tanmu){
    
	var msgtip="";
	if($("#msg_tip").attr("checked")){
		msgtip="msgtip=2&";
		$("#msg_tip").attr("checked",false);
                SysSend.command('msgtip',str);
	    }
	else if($("#msg_tip_admin").attr("checked")){
		msgtip="msgtip=3&";
			$("#msg_tip_admin").attr("checked",false);
		$("#msg_tip_admin_show").html(decodeURIComponent("<span style='color:red'>"+str+"</span>"));
                }
	if(RoomInfo.Msglog=='0')return;
	var request_url='../ajax.php?act=putmsg';
        if(tanmu=='' || tanmu==undefined){tanmu='false';}
	var postdata=msgtip+'msgid='+msgid+'&uname='+encodeURIComponent(uname)+'&tname='+encodeURIComponent(tname)+'&muid='+uid+'&rid='+rid+'&tid='+tid+'&privacy='+privacy+'&style='+style+'&msg='+str+'&tanmu='+tanmu+'&'+Math.random() * 10000;
	
	$.ajax({type: 'POST',url:request_url,data:postdata});
}
function Mkick(adminid,rid,ktime,cause)
{
	$.ajax({type: 'get',dataType:'json',url: '../ajax.php?act=kick&aid='+adminid+'&rid='+rid+'&ktime='+ktime+'&cause='+encodeURIComponent(cause)+'&u='+encodeURIComponent(My.name)+'&'+Math.random() * 10000,
			success:function(data){
				//alert(data);
				if(data.state=="yes"){
				location.href="room/error.php?msg="+encodeURI('你被踢出！并禁止'+ktime+'分钟内登陆该房间！<br>原因是 '+cause+'');
				}
			}
	});
}

function FormatMsg(Msg)
{
	var User=UserList.get(Msg.ChatId);
	var toUser=UserList.get(Msg.ToChatId);
	var date= Datetime(0);
	var IsPersonal='';
	if(typeof(User)=='undefined'){
        var request_url='../ajax.php?act=getUser&userid='+Msg.ChatId;
		$.ajax({type: 'get',async:false,url:request_url,success:function(data){  User=eval("("+data+")");}});    
    }
    if(typeof(toUser)=='undefined'){toUser={sex:2,chatid:'ALL',nick:'大家'}}
	if(Msg.IsPersonal=='true' && toUser.chatid!='ALL') IsPersonal='[私]';
	var Txt=decodeURIComponent(Msg.Txt.str_replace());

	if(Txt.indexOf('C0MMAND')!=-1)
	{
		var command=Txt.split('_+_');
		switch(command[1])
		{
			case 'setVideoSrc':
				$('#defvideosrc').html("当前讲师:"+command[3]);
				var date= Datetime(0);
				var str='<div style="height:22px; line-height:22px;">欢迎：<font class="u" ">讲师-'+command[3]+'</font>开讲啦！ <font class="date">'+date+'</font></div>';
				playSound("1.mp3");
				
			break;
                        case 'setVideoover':
				$('#defvideosrc').html('当前讲师:');
				var date= Datetime(0);
				var str='<div style="height:22px; line-height:22px;">系统提示：<font class="u" ">讲师下课啦！ <font class="date">'+date+'</font></div>';
				
				
			break;
            case 'BanSpeak':
				RoomInfo.banspeak=command[2];
				break;

            case 'sendredbag':
				$('.RegBagNum span').html(command[2]);
				//弹框显示发送礼物
				var giftid = command[5],
					userid = command[6],
					giftname = command[7],
					from_client_name = command[8],
					cover = 'room/images/gift/gift_bg.png',
					logo = command[4];
				limit();
				if ($('.div' + giftid + userid).length > 0) {
					var num = parseInt(sessionStorage.getItem(giftid + userid)) + 1;
					sessionStorage.setItem(giftid + userid, num);
					$('.div' + giftid + userid).find('i').html('<em style="background:url(room/images/gift/texthxpic.png)"></em>'+
					'<em style="background:url(room/images/gift/texth'+num.toString().substring(0,1)+'.png)"></em>'+
					'<em style="background:url(room/images/gift/texth'+num.toString().substring(1,2)+'.png)"></em>'+
					'<em style="background:url(room/images/gift/texth'+num.toString().substring(2,3)+'.png)"></em>'+
					'<em style="background:url(room/images/gift/texth'+num.toString().substring(3,4)+'.png)"></em>');
					var $gifuser = $('.div'+giftid+userid).find('i')[0];
					LLCscale({ 'obj':$gifuser,'maxValue':'1.5','changValue':0.1});
					LLCscale({ 'obj':$gifuser,'maxValue':'1.5','changValue':0.1});
					clearTimeout(timer1);
					clearTimeout(timer2);
				} else {
					var num = 1;
					sessionStorage.setItem(giftid + userid, num);
					
					new_obj = $("<div class='fly_huang putonggift div"+giftid+userid+
						"' style='opacity:0.1; background:url(" +cover+") no-repeat;'><p class='colorh'>" 
						+ from_client_name + "</p><p class='colorh'>"
						+"送出了" + giftname + "</p><img src='"+logo+"'><i>"
						+'<em style="background:url(room/images/gift/texthxpic.png)"></em>'
						+'<em style="background:url(room/images/gift/texth'+num.toString().substring(0,1)+'.png)"></em>'
						+'<em style="background:url(room/images/gift/texth'+num.toString().substring(1,2)+'.png)"></em>'
						+'<em style="background:url(room/images/gift/texth'+num.toString().substring(2,3)+'.png)"></em>'
						+'<em style="background:url(room/images/gift/texth'+num.toString().substring(3,4)+'.png)"></em>'
						+ "</i></div>");
					$('#MsgBox').before(new_obj);
					$('.putonggift').animate({
						right: 0 + 'px',
						opacity: 1
					},500);
					rank();
					var $gifuser_ii = $('.div'+giftid+userid).find('i')[0];
					LLCscale({ 'obj':$gifuser_ii,'maxValue':'1.5','changValue':0.1});
				}
				timer1 = setTimeout(function() {
					$('.putonggift').eq(0).animate({
						right: -403 + 'px',
						opacity: 0
					}, 500);
				}, 5000);
				timer2 = setTimeout(function() {
					$(".putonggift") .eq(0).remove();
					rank();
				}, 5500);
				
				// var date= Datetime(0);
				// var str='<div style="clear:both;"></div><div class="lts_right3"><span class="time">'+date+'</span><span class="hb_msg" style="color:#fff;  background: #FD8403;box-shadow: 0 0 5px #FD8403; font-size:13px;"><img src="room/images/ico_flow2.png">'+command[3]+'</span></div>';
				// _red(command[4]);
				
			break;
            case 'hongbaoinfo':
				var str='<div class="message-wrap"><div class="redbag-info1"><p style="color:#333;">'+command[4]+' 领取了 <span style="color:red;">'+command[2]+'</span> 的红包获得 <span style="color:red;">'+command[3]+'元</span></p></div><div class="clear"></div></div>';
			break;
			case 'send_Msgblock':
				if(My.chatid==toUser.chatid){
					remove_auth('msg_send');
					layer.msg('你已被禁言！',{shift: 6});
				}
			break;
			case 'msgAudit':
				$('#'+command[2]).show();
                                $('#bt_audit_'+command[2]).hide();
				MsgAutoScroll();
				
			break;
			case 'msgBlock':
				$('#'+command[2]).remove();
				MsgAutoScroll();
			
			break;
			case 'rebotmsg':
                        case 'automsg':
				var msg={};
				msg.ChatId=command[2];
				msg.ToChatId='ALL';
				msg.IsPersonal='false';
				msg.Txt=command[4]+'_+_'+command[3];
				msg.Style=Msg.Style;
				MsgShow(FormatMsg(msg),0);
                             if(Msg.tanmu=='true'){writeBarrage(decodeURIComponent(command[3]))};
			break;		
			
			case 'kick':
				if(My.chatid==toUser.chatid){				
					Mkick(Msg.ChatId,My.roomid,command[2],command[3]);				
				}
			break;
                      case 'rollnotice':

              var rollarr=command[2].split('++');
             
    // var text_obj='{ "text":"'+rollarr[0]+'","color":"'+rollarr[1]+'","size":"'+rollarr[2]+'","position":"'+rollarr[3]+'","time":"2"}';
 var    divHtml = $('<div class="dShow positionAbs"><span style="text-shadow:0 0 10px '+rollarr[1]+'">'+rollarr[0]+'</span></div>');$("body").append(divHtml), $(".dShow").find("span").css({
            "font-size": "35px",
            color: "#fff",
       
            fill: "#fff"
        }), $(".dShow").css({
            "font-size": "35px",
            color: "#fff",
            fill: "#fff"
        }), initScreen(divHtml)
       break;
        case 'handanvideo':
	playSound("handan.mp3");
	break;
                      case 'msgtip':
			$("#msg_tip_show").html(decodeURIComponent("<span style='color:#FF0'>"+command[2]+"</span>"));
			
			break;
			
			case 'setstate':
				UserList.setstate(command[2],command[3],command[4]);
			break;
			case 'setVideo':
				toUser=UserList.get(command[3]);
				var str='<div style="height:22px; line-height:22px;">'+IsPersonal+'<font class="u" color="'+aColor[User.sex]+'" onclick="ToUser.set(\''+User.chatid+'\',\''+User.nick+'\')">'+User.nick+'</font> 设置 <font class="u" color="'+aColor[toUser.sex]+'" onclick="ToUser.set(\''+toUser.chatid+'\',\''+toUser.nick+'\')">'+toUser.nick+'</font> 为房间公共视频  <font class="date">'+date+'</font></div>';
				try{
					
					if(RoomInfo.OtherVideoAutoPlayer!="0"){
						
						//$('#OnLine_MV').html('<iframe id="zhibo" height="390" width="100%" allowTransparency="true" marginwidth="0" marginheight="0"  frameborder="0" scrolling="no" src="room/player.php?rid='+My.rid+'&type=pc"></iframe>');	
						
					}
					
				else if(command[3]==My.chatid)
				{
					thisMovie('pVideo').stopS(RoomInfo.AutoSelfVideo);
					thisMovie('pVideo').sConnect(RoomInfo.VServer,command[2]+'·'+command[3],'1');
					//thisMovie('pVideo').pShow("2",toUser.nick);
				}
				else
				{
					thisMovie('pVideo').stopS(RoomInfo.AutoSelfVideo);
					thisMovie('pVideo').pConnect(RoomInfo.VServer,command[2]+'·'+command[3],toUser.nick);
					
				}
				}catch(e){}
			break;
			case "sendgift":
				//('sengift','{$uid}_+_{$sid}_+_{$gid}_+_{$num}_+_{$gname}_+_{$msg}')
				var u=UserList.get(command[2]);
				var s=UserList.get(command[3]);
				for(var i=1;i<=command[5];i++){
					if(i>300)break;
					setTimeout('ShowGifteffect("'+command[4]+'")',10*i);
					}
				var str='<p><font class="u" color="'+aColor[u.sex]+'" onclick="ToUser.set(\''+u.chatid+'\',\''+u.nick+'\')">'+u.nick+'</font> 向 <font class="u" color="'+aColor[s.sex]+'" onclick="ToUser.set(\''+s.chatid+'\',\''+s.nick+'\')">'+s.nick+'</font> 送了<img src="../gift/img.php?id='+command[4]+'" height="50" width="50"/> (<span style="color:red"><b>'+command[5]+'</b></span>份) '+command[6]+' <font color="'+aColor[u.sex]+'">赠言： '+command[7]+'</font> <font class="date">'+date+'</font></p>';
				
			break;
		}
	}
	else
	{
	var msgid="";
	if(Txt.indexOf('_+_')>-1){
		var t=Txt.split('_+_');
		msgid= t[0];
		Txt=t[1];
	}
	var msgBlockBt="";
	if(RoomInfo.msgBlock=="1"){
		if(check_auth('msg_block'))	
		msgBlockBt=" <p  class='checkMessage' onclick='bt_msgBlock(\""+msgid+"\")'>屏蔽消息</p>";
	}
	
	var msgAuditBt="";
	var msgAuditShow='';
	if(RoomInfo.msgAudit=="1"){
		msgAuditShow='style="display:none"';
		
		if(check_auth('msg_audit')){
			msgAuditBt=" <p  class='checkMessage' onclick='bt_msgAudit(\""+msgid+"\",this)' id='bt_audit_"+msgid+"'>审核通过</p>";
			msgAuditShow="";
		}
		if(User.chatid==My.chatid)msgAuditShow="";
		
	}
	var who=" notmine ";	
	if(User.color=='2'){
		who=" manage";
	}
	else if(User.color=='3'||User.color=='4'){
		who=" teacher";
	}
	if(Msg.Style=='Sendredbag'){who=" redbag";}else if(Msg.Style=='appsend'){who=" appsend";}
	
	if(toUser.chatid!="ALL"){
		str='<div style="clear:both; height:0px;"></div><div class="msg'+who+'" id="'+msgid+'" '+msgAuditShow+'><div class="msg_head"><img src="'+grouparr[User.color].ico+'" class="msg_group_ico" title="'+grouparr[User.color].title+"-"+grouparr[User.color].sn+'"></div><div class="msg_content"><div>'+IsPersonal+'<font class="u" style="color:'+aColor[User.sex]+'" onclick="ToUser.set(\''+User.chatid+'\',\''+User.nick+'\')">'+User.nick+'</font>&nbsp;&nbsp;<font class="dui">对</font> <font class="u" style="color:'+aColor[toUser.sex]+'" onclick="ToUser.set(\''+toUser.chatid+'\',\''+toUser.nick+'\')">'+toUser.nick+'</font> 说 <font class="date">'+date+'</font></div><div class="layim_chatsay"><font  style="'+Msg.Style+';" >'+Txt+'</font></div>'+msgBlockBt+msgAuditBt+'</div></div><div style="clear:both; height:0px;"></div>';
              //  str='<div style="clear:both;"></div><div class="lts_right3" id="'+msgid+'" '+msgAuditShow+'><span class="time">'+date+'</span><img src="'+grouparr[User.color].ico+'" title="'+grouparr[User.color].title+"-"+grouparr[User.color].sn+'" class="RoomUserRole"><a class="name" href="javascript:void(0)" '+display+'>'+User.nick+'</a><font class="dui">对</font><a class="name" href="javascript:void(0)">'+toUser.nick+'</a><span class="to_m" style="'+Msg.Style+';">'+Txt+'</span>'+msgBlockBt+msgAuditBt+'</div>';
	}else{
		str='<div style="clear:both; height:0px;"></div><div class="msg'+who+'" id="'+msgid+'" '+msgAuditShow+'><div class="msg_head"><img src="'+grouparr[User.color].ico+'" class="msg_group_ico" title="'+grouparr[User.color].title+"-"+grouparr[User.color].sn+'"></div><div class="msg_content"><div>'+IsPersonal+'<font class="u" style="color:'+aColor[User.sex]+'" onclick="ToUser.set(\''+User.chatid+'\',\''+User.nick+'\')">'+User.nick+'</font>&nbsp;&nbsp;<font class="date">'+date+'</font></div><div class="layim_chatsay" ><font  style="'+Msg.Style+';" >'+Txt+'</font></div>'+msgBlockBt+msgAuditBt+'</div></div><div style="clear:both; height:0px;"></div>';
              //  str='<div style="clear:both;"></div><div class="lts_right3" id="'+msgid+'" '+msgAuditShow+'><span class="time">'+date+'</span><img src="'+grouparr[User.color].ico+'" title="'+grouparr[User.color].title+"-"+grouparr[User.color].sn+'" class="RoomUserRole"><a class="name" href="javascript:void(0)" '+display+'>'+User.nick+'</a><span class="to_m" style="'+Msg.Style+';">'+Txt+'</span>'+msgBlockBt+msgAuditBt+'</div>';
	}
	}
	return str;
	
}

function ShowGifteffect(gid){
	var Gift_id='G'+Math.round(Math.random())+Math.round(Math.random());
	var div=CreateElm(false,'div',false,Gift_id);
	div.style.position='absolute';
	div.style.display="none";
	div.style.top=Math.round(Math.random()*document.documentElement.clientHeight-50)+'px';
	div.style.left=Math.round(Math.random()*document.documentElement.clientWidth-50)+'px';
	div.innerHTML='<img src="../gift/img.php?id='+gid+'" height="80" width="80" />';
	div.style.display="";
	setTimeout("RemoveElm(false,getId('"+Gift_id+"'))",5000);
}
var msgBlock='';
function MsgShow(str,type){

        $('#MsgBox1').append(str);
	if($('#MsgBox1').find(".msg").length>200){$('#MsgBox1').find(".msg:first").remove();}
	$(".layim_chatsay img").unbind();
        $(".layim_chatsay  img").bind("click",function(){if($(this).width()>=300||$(this).height()>=300)open_img($(this).attr('src'),1300,800)});
          $(".layim_chatsay  img").on("mouseover",function(){if($(this).width()>=300||$(this).height()>=300){$(this).attr("title","点击看大图");$(this).addClass("chat-pic");}});
	//$(".layim_chatsay  img").attr("title","点击看大图"); 
        MsgAutoScroll();
}
function MsgAutoScroll(){
	if(toggleScroll == true){
	$('#MsgBox1').scrollTop($('#MsgBox1')[0].scrollHeight);
	//$('#MsgBox1').animate({scrollTop:$('#MsgBox1')[0].scrollHeight}, 1000);
	
	}
}
var blinkerTimer;
function MsgAlert(tag)
{
	MsgCAlert();
	
	if(tag==0){document.title='您有新消息！请注意查收！';blinkerTimer=setTimeout('MsgAlert(1)',1000);}
	if(tag==1){document.title=RoomInfo.defaultTitle;blinkerTimer=setTimeout('MsgAlert(0)',1000);}
}
function MsgCAlert()
{
	if(blinkerTimer)clearTimeout(blinkerTimer);document.title=RoomInfo.defaultTitle;
}

function saveCode(obj,filename){
  var winname = window.open("", "", "top=10000,left=10000");
  winname.document.open("text/html", "replace");
  winname.document.writeln(obj);
  winname.document.execCommand("saveas", "", filename + ".html");
  winname.close();
}

function dragWinx(o){

}
function dragMsgWinx(o){
	//o.firstChild.onmousedown=function(){return false;};
	o.onmousedown=function(a){
		var d=document;if(!a)a=window.event;
		var dy=a.clientY-getId('MsgBox1').offsetHeight;
		var x=getId('MsgBox2').offsetHeight+getId('MsgBox1').offsetHeight;
		if(o.setCapture)
			o.setCapture();
		else if(window.captureEvents)
			window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
		
		d.onmousemove=function(a){
			if(!a)a=window.event;
			var t=Math.min(Math.max(120,a.clientY-dy),x-40);
			getId('MsgBox1').style.height=t+'px';
			getId('MsgBox2').style.height=x-t+'px';
		};

		d.onmouseup=function(){
			if(o.releaseCapture)
				o.releaseCapture();
			else if(window.captureEvents)
				window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			d.onmousemove=null;
			d.onmouseup=null;
		};
	};
}
function openWithIframe(tit,url,w,h,str,o){
if(url==null)
{
    $.layer({
        type: 1,
        title: false, //不显示默认标题栏
        shade: [0], //不显示遮罩
        area: ['600px', '360px'],
        page: {html: '<img src="http://static.oschina.net/uploads/space/2014/0516/012728_nAh8_1168184.jpg" alt="layer">'}
    });
}
else
{
	$.layer({
        type: 2,
        title: tit!=""?tit:false,
        maxmin: false,
        shadeClose: true, //开启点击遮罩关闭层
        area : [w+'px' , h+'px'],
        offset : ['100px', ''],
        iframe: {src: url}
    });
}



}

function closeWithIframe(){
	layer.close();
}

function addRedBag(){
	
	
	 $.get("../ajax.php?act=addredbag",function(data){
                     if(data=='1'){
                   My.redbags_num=My.redbags_num+5;
        // $("#redbags").html(My.redbags_num);
                    }   
         });
       
}
function online(rst)
{
	
	var xmlhttp=XHConn();
	var request_url="../ajax.php?act=online&rst="+rst+"&num="+getId('OnlineUserNum').innerHTML+"&"+Math.random() * 10000;
	try{
		xmlhttp.open('GET',request_url,true);
		xmlhttp.send(null);
		xmlhttp.onreadystatechange=function()
		{
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
				var re = eval("("+xmlhttp.responseText+")");
				if(re.state=="logout")
				{alert('你还没有登陆！');location.href='../index.php'}
				
			}
			return true;
		}
	}
	catch(e) {return true;}
}
function kefuonline(rst)
{
    var request_url="../ajax.php?act=kefuonline&rid="+My.rid+"&rst="+rst+"&"+Math.random() * 10000;
$.ajax({ type:'get', url:request_url, success:function(data){  }}); 	
	
}

function openWin(type,title,content,w,h){
	layer.closeAll('iframe');layer.close(tbox);
        
		layer.open({
		type: type,
		title: title,
                shadeClose: true,
                shift: 5, //0-6的动画形式，-1不开启
		area: [w+'px', h+'px'],
		content: content //iframe的url
		});
	
}
function openWin_nuoyun(type,title,content,w,h){
	layer.closeAll('iframe');layer.close(tbox);
        
		layer.open({
		type: type,
		title: title,
                skin: 'layer-ext-nuoyun',
		shadeClose: true,
                shift: 5, //0-6的动画形式，-1不开启
		shade: false,
		area: [w+'px', h+'px'],
		content: content //iframe的url
		});
	
}
function openApp(obj){
	layer.closeAll('iframe'); 
	if(obj.target=="NewWin"){
		window.open(obj.url);
	}
	else if(obj.target=="POPWin"){
		layer.open({
		type: 2,
		title: obj.title,
                 skin: 'layer-ext-nuoyun',
		shadeClose: true,
		shift: 5, //0-6的动画形式，-1不开启
		area: [obj.w+'px', obj.h+'px'],
		content: obj.url //iframe的url
		});
	}
	else if(obj.target=="QPWin"){
		layer.open({
    	        type: 2,
		shadeClose: true,
                shift: 5, //0-6的动画形式，-1不开启
		title: false, //不显示标题
          content: obj.url, //捕获的元素
		area: [obj.w+'px', obj.h+'px']
	});
	}
	
}
function loginTip(){	
	//$('#OnLine_MV').html('直播体验结束，请登录！');
	//openWin(2,false,'minilogin.php',390,310);ar
        layer.close(tbox);
        var boxstr='<div class="tbox malert"><div class="tinner"><div class="tcontent"><p id="alertmsg">您已在直播室收听5分钟，赶紧领取会员或VIP马甲，点击下方注册会员或联系上方QQ在线客服，即刻享受更多优质服务。</p><div class="bts"><a id="reg" href="javascript:openWin(2,false,\'room/minilogin.php?a=0\',370,525);">注册</a> <a id="login" href="javascript:openWin(2,false,\'room/minilogin.php\',370,340);">登录</a></div></div><div class="closeMessBtn" onclick="layer.close(tbox);"></div></div></div>';
       tbox= layer.open({
		type: 1,
		title: false,
		shadeClose: true,
		shade: false,
               closeBtn: false,
                 bgcolor: '',
		area: ['499px', '361px'],
		content: boxstr 
		});
                
                layer.style(tbox, {
   'box-shadow':'none',
   'background-color': 'transparent'
    
}); 
}
function access_time(){	
    var first_access_time=  getCookie("first_access_time");
    var time_now =new Date().getTime();
    time_now=parseInt(time_now/1000);
    if((time_now-first_access_time)>(RoomInfo.tiyantime*60)){ 
        $('.videoTime').hide();
        $('#OnLine_MV').html('<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td align="center"><img src="/room/images/xm.png"></td></tr></tbody></table>');
    }
}
function app_sendmsg(msg){
	var msgid=randStr()+randStr();
	//var str='SendMsg=M=ALL|false|color:#000|'+msgid+'_+_'+encodeURIComponent(msg.str_replace());
          var str = '{"type":"SendMsg","ToChatId":"ALL","IsPersonal":"false","Style":"appsend","tanmu":"false","Txt":"'+msgid+'_+_'+encodeURIComponent(msg.str_replace())+'"}';
         ws.send(str);
         if(check_auth('hd_add')){
         if(msg.indexOf('#app_1')>-1){SysSend.command('handanvideo','handan.mp3');}}
	PutMessage(My.rid,My.chatid,'ALL',My.nick,'ALL','false','appsend',msg.str_replace(),msgid)
}
function check_auth(auth){
	var auth_rules = grouparr[My.color].rules;
	if(auth_rules.indexOf(auth)>-1)return true;
	else false;
}
function remove_auth(auth){
	grouparr[My.color].rules=grouparr[My.color].rules.replace(auth,"");
}
function BrdBlur(id) {
	
		var e=getEvent();
		var act=document.activeElement?document.activeElement:e.explicitOriginalTarget
		var src=e.srcElement ? e.srcElement : e.target
		if (!CommObjectCheck(act, src)) {
			getId(id).style.display='none';
		}
}

function HideMenu()
{
    var elementTable=["ColorTable","Send_key_option","FontBar","caitiao"];
    for(var i=0;i<elementTable.length;i++)
      getId(elementTable[i]).style.display='none'
} 
//全局事件绑定
//window.onblur =function(){
//    if(!isIE){
//        HideMenu();
//    }
//}; 
function getEvent() //同时兼容ie和ff event
{  
        if(document.all)   return window.event;    
        func=getEvent.caller;        
        while(func!=null){  
            var arg0=func.arguments[0];
            if(arg0)
            {
              if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
              {  
              return arg0;
              }
            }
            func=func.caller;
        }
        return null;
}
function MsgKeyDown()
{

}
function showsyssmg(txt){
	//alert(txt);
	var date= Datetime(0);

	var s='<div style="clear:both;"></div><div class="msg system-msg" ><div class="msg_head"><img src="/images/sys.png"></div><div class="msg_content"><div><font class="u" style="color:#fff" >系统消息</font>   <font class="date">&nbsp;&nbsp;'+date+'</font></div> <div class="layim_chatsay"><font style="color:#fff">'+txt+'</font></div></div></div><div style="clear:both;"></div>';
	//var  s='<div style="clear:both;"></div><div class="lts_right3"><span class="time">'+date+'</span><img src="/images/sys.png" class="RoomUserRole"><a class="name" style="color:#FFF68F;" href="javascript:void(0)" >系统消息</a><span class="to_m" style="color:rgb(255, 0, 0); font-size:15pt;font-family: KaiTi_GB2312;font-weight:bold;">'+txt+'</span></div>';
	
	MsgShow(s,0);
}
function getsysmsg(){
  
	$.getJSON("../ajax.php?act=getsysmsg","rid="+My.rid,
	function(data){
        
		if(data.state=='1'){
			data.sysmsg_id=0;
			timer_fun=function(){
				if(data.info.length<1)return;
				if(data.fangshi=="1"){
                                    data.sysmsg_id=Math.ceil(Math.random()*(data.info.length-1));
					
				}else{
					if(data.sysmsg_id>=data.info.length){data.sysmsg_id=0;}
				
				}
				showsyssmg(data.info[data.sysmsg_id++]);
			}
			timer_fun();
                        if(data.fangshi!='3'){
			setInterval('timer_fun()',data.jiange*1000);
                        }
		}
	});
}
function randStr(){
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
//初始化表情包和彩条
function sendCaitiao(tag){
	var ct=[];
	ct['dyg']='<img src="/room/face/colorbar/dyg.gif">';
	ct['zyg']='<img src="/room/face/colorbar/zyg.gif">';
	ct['gl']='<img src="/room/face/pic/s1.gif"><img src="/room/face/pic/s1.gif"><img src="/room/face/pic/s6.gif"><img src="/room/face/pic/s6.gif"><img src="/room/face/pic/geili_thumb.gif"><img src="/room/face/pic/geili_thumb.gif"><img src="/room/face/pic/s0.gif"><img src="/room/face/pic/s0.gif">';
	ct['zs']='<img src="/room/face/colorbar/zs.gif">';
	ct['xh']='<img src="/room/face/colorbar/xh.gif">';
	app_sendmsg(ct[tag]);
        $('#caitiao').hide();
}
function showFacePanel(e,toinput){
           $.get("room/face/pic/face.html",function(data){
		$('#face').html(data);
		$('#facenav li').on('click',function(){
			var rel = $(this).attr('rel');
			$('#face dl').hide();
			$('#f_'+rel).show();
			$(this).siblings().removeClass('f_cur');
			$(this).addClass('f_cur');

		});	
	}).success(function(){
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
	var offset = $(e).offset();

	var t = offset.top;
	var l = offset.left;
	$('#face').css( {"top" : t-$('#face').outerHeight(), "left":l});
	$('#face').show();
	$('#face').attr("toinput" , toinput);
}
function  initFaceColobar(){
	 $.get("room/face/colorbar/colorbar.html",function(data){
		$('#caitiao').html(data);
		//彩条
		$('#bt_caitiao').on('click',function(){
			var offset = $('#bt_caitiao').offset();
			var t = offset.top;
			var l = offset.left;
			$('#caitiao').css( {"top" : t-$('#caitiao').outerHeight(), "left":l});
	
			$('#caitiao').show();
			
		});
		$('#caitiaonav li').on('click',function(){

			var rel = $(this).attr('rel');
			$('#caitiao dl').hide();
			$('#c_'+rel).show();
			$(this).siblings().removeClass('f_cur');
			$(this).addClass('f_cur');
		});	
		
	});
	}
//设置cookies
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();

}

//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return (arr[2]);
    else
        return null;
}
function _toRight(){
	var _mLeft = parseInt($("#UI_Left").css("margin-left"));
	
	if( _mLeft < 0){
		
		$("#UI_Left").animate({"margin-left":"2px"});
                
                $("#UI_Central").animate({"margin-left":"198px"});
		
	}else{
		
		$("#UI_Left").animate({"margin-left":"-192px"});
                $("#UI_Central").animate({"margin-left":"3px"});
	
	}
	
}
var rollnotice_open;
function click_notice(){
    var notice_v =$('#rollnotice').val();
    var color = document.getElementById('color').value;
    notice_v =notice_v+'++'+color;
    SysSend.command('rollnotice',notice_v);
    layer.msg('发射成功！', {icon: 1});
      // layer.close(rollnotice_open);

}
function  bt_rollnotice(){
  
  var loadstr='<div style=" text-align:center;width:450px;height:250px;" onselectstart="return true;"><div>'
  	+'<textarea id="rollnotice" class="textarea" name="rollnotice"  style="width:410px;height:150px;margin:10px;"></textarea>'
    	+'</div>'
	+'<div ><select  name="color" id="color" ><option value="red">红色</option><option value="white">白色</option><option value="green">绿色</option><option value="blue">蓝色</option><option value="yellow">黄色</option></select>'
        +'<a href="javascript:void(0)" style="background-color: #f77a22;border-radius: 5px;padding: 5px 30px;font-size:15px;margin-left:40px;" onclick="click_notice()">发     射</a></div></div>';
	rollnotice_open=layer.open({
		type: 1,
		title: '弹幕内容',
		shadeClose: true,
		shade: false,
		area: ['450px', '250px'],
		content: loadstr //iframe的url
		});
    
}

var cc=0;
var mm='';
var sp='';
var msgjiange='';
function click_automsg(){
     if(!check_auth("room_admin")){
        return;
    }
    if(typeof($('#automsg').val())!='undefined'){
         mm =$('#automsg').val();
        sp =$('#msgjiange').val()*1000;
        setCookie("automsg",mm);
    }
   
   var msgstrs= new Array();  
    msgstrs=mm.split("\n"); 
    var renum=$('#OnLineUser').find('.rebots').length;
    if(renum==0){
        alert('当前没有在线机器人，不能自动发言！');
        return;
    }
    var treb=  parseInt(Math.random()*renum);
    if(cc==msgstrs.length || cc==100 ){
        cc=0;
        return;
    }
     var msgid=randStr()+randStr();
    var rebot_id=$('#OnLineUser').find('.rebots')[treb].id;
 
    if(msgstrs[cc].length>0){
    var Msg='C0MMAND_+_automsg_+_'+rebot_id+'_+_'+msgstrs[cc]+'_+_'+msgid;
   // var msgstr='SendMsg=M=ALL|false|font-size:13px|'+Msg;
     var msgstr = '{"type":"SendMsg","ToChatId":"ALL","IsPersonal":"false","Style":"font-size:13px","tanmu":"'+tanmuSelect+'","Txt":"'+Msg+'"}';
    ws.send(msgstr);
    var rebotInfo=UserList.get(rebot_id);
    PutMessage(My.rid,rebot_id,'ALL',rebotInfo.nick,'大家',rebotInfo.color,'font-size:13px',msgstrs[cc],msgid);
    }
    cc=cc+1;
    setTimeout("click_automsg()",sp);
  }
function  bt_automsg(){
     if(getCookie("automsg")!=null){var info=unescape(getCookie("automsg"));}else {info='';}
  var loadstr='<div style=" text-align:center;width:700px;height:300px;" onselectstart="return true;"><div>'
  	+'<textarea id="automsg" class="textarea" name="automsg"  style="width:660px;height:200px;margin:10px;">'+info+'</textarea>'
    	+'</div>'
	+'<div style="margin-top: -4px;"><font color="red" size="3">发言间隔(秒)：</font><input type="text" id="msgjiange" name="msgjiange" maxlength="16" style="height: 26px;">'
        +'<a href="javascript:void(0)" style="background-color: #f77a22;border-radius: 5px;padding: 10px 30px;font-size:15px;margin-left:40px;" onclick="click_automsg()">发     射</a></div></div>';
	layer.open({
		type: 1,
		title: '自动发言&nbsp;&nbsp;(一行一条发言)',
		shadeClose: true,
		shade: false,
		area: ['700px', '300px'],
		content: loadstr //iframe的url
		});
    
}
function initScreen(a){var b,c,e,f,g;a=$(a),b=160,a=$(a),c=$(window).width(),$(window).height(),e=2.5*a.width(),b+=Math.round(250*Math.random()),f=a.find("span").attr("style"),a.attr("style",f),a.find("img").each(function(){$(this).attr("original")&&$(this).remove()}),a.css({left:c,top:b,width:e,"z-index":99999}),g=3e4,0==$(this).index()%2&&(g=5e4),a.animate({left:"-"+1.5*c+"px"},g,"linear",function(){a.remove()})}

function changeSkin(e){
$(document.body).css({'background': 'url(' + e.rel + ') #663366','background-size': '100%'});
setCookie("bg_img_"+My.rid,e.rel);;
}

function open_aboutus(){
       layer.open({
  type: 1,
  title: '关于我们',
  area: ['630px', '380px'],
  shade: 0,
  closeBtn: 1,
  shadeClose: true,
  content: '<video id="lss" controls="" preload="auto" webkit-playsinline style="width:100%;height:355px;"> <source src="aboutus.mp4" type="video/mp4"></video>'
});
}
function pad(num){
 var len = num.toString().length;  
    if(len < 2) {  
        num = "0" + num;  
        
    }  
    return num;     
    
}
function viewTime() {
   var view_time = viewtime;
    if(view_time < 0) {
        $('.videoTime').html('<div class="videoTimeTxt">您的体验时间已经用完，即将关闭！</div>');
        clearInterval(tiyantime);
        return;
    }
	var second = view_time % 60;
       second=pad(second);
	var view_time = parseInt(view_time / 60);
	var minute = view_time % 60;
        minute=pad(minute);
	var view_time = parseInt(view_time / 60);
	var hour = view_time % 24;
         hour=pad(hour);
	var day = parseInt(view_time / 24);
      day=pad(day);
	$('.second').html(second);
	$('.minute').html(minute);
	$('.hour').html(hour);
	$('.day').html(day);
	
    viewtime = viewtime - 1;
}
function add_QQ(qqnum) {
	$("#add_QQ").remove(), $("body").append('<iframe id="add_QQ" src=tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin='+qqnum+'&website=www.oicqzone.com style="display: none;"></iframe>')
}