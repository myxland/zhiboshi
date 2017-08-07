var arr = service.split('*');

//乱序
function KffnLuanXu() {
	
	var num = arr.length;
	for (var i = 0; i < num; i++) {
		var iRand = parseInt(num * Math.random());
		var temp = arr[i];
		arr[i] = arr[iRand];
		arr[iRand] = temp;
	}
	
	location.href='tencent://message/?Uin='+arr[0]+'&Site=www.qq.com&Menu=yes';
}
