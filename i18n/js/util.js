function showMsg(msg){
    //console.log(translateMsg(msg));
    translateMsg(msg)
    alert(msg[0].message + '>' + msg[1].message + '>' + msg[2].message)
}

function isString(str){
    return (typeof str=='string')&&str.constructor==String;
}

function isArray(obj){
    return (typeof obj=='object')&&obj.constructor==Array;
}

function isObject(obj){
    return (typeof obj=='object')&&obj.constructor==Object;
}


function translateErrorMsg(msg) {
    if(localStorage.getItem("lang-token") === "zh"){
        return;
    }
    $.each(msg,function(index,value){
        msg[index] = translateMsgOfObject(value)
    });
    return msg;
}

function translateMsg(msg){
    //如果是选择中文环境就不翻译
    if(localStorage.getItem("lang-token") === "zh"){
        return msg;
    }

    if(isString(msg)){
        return $.i18n.prop(msg);
    }

    //[{"message":"检索失败！"},{"message":"此用户[不存在！]"}]
    else if(isArray(msg)){
        $.each(msg,function(index,value){
            msg[index] = translateMsgOfObject(value)
        });
        return msg;
    }

}

function translateMsgOfObject(obj){
    for(var i in obj){
        obj[i] = $.i18n.prop(obj[i]);
    }
    return obj;
}

function resetToken(lang){
    //获取localstorage里的值，存入语言token
    localStorage.setItem("lang-token",lang);

    jQuery.i18n.properties({
        name:'swd',
        path:'bundle/',
        mode:'map',
        language:lang,
        async: true,
        callback: function() {
            // We specified mode: 'both' so translated values will be
            // available as JS vars/functions and as a map

            // Accessing a simple value through the map
            //jQuery.i18n.prop('msg_hello');
            // Accessing a value with placeholders through the map
            //jQuery.i18n.prop('msg_complex', 'John');

            $('#hi').text(jQuery.i18n.prop('msg_hello'));
            $('#username').text(jQuery.i18n.prop('msg_complex', 'John'));
            $('#bt').text(jQuery.i18n.prop('click_me'));
            $('#username').attr('placeholder',translateMsg('账号'));
            $('#password').attr('placeholder',translateMsg('密码'));

            // Accessing a simple value through a JS variable
            //alert(msg_hello +' '+ msg_world);
            // Accessing a value with placeholders through a JS function
            //alert(msg_complex('John'));
        }
    });
}