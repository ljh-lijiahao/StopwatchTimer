const btn1 = document.querySelector('.btn-1');
const btn2 = document.querySelector('.btn-2');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const data = document.querySelector('.data');
const clear = document.querySelector('.log-clear');
btn2.disabled = true;
clear.disabled = true;
let t = null;   //全局变量  null为空对象 用来存储定时器
let ms = 0; //保存毫秒作为记录显示
btn1.addEventListener('click', function () {
    if (btn1.innerHTML === '开始') {
        btn1.innerHTML = '停止';
        btn2.disabled = false;
        const time = +new Date();
        t = setInterval(function () {
            const timer = +new Date();
            const times = (timer - time) / 1000;
            let h = parseInt(times / 60 / 60 % 24);
            h = h < 10 ? '0' + h : h;
            hour.innerHTML = h;
            let m = parseInt(times / 60 % 60);
            m = m < 10 ? '0' + m : m;
            minute.innerHTML = m;
            let s = parseInt(times % 60);
            s = s < 10 ? '0' + s : s;
            second.innerHTML = s;
            ms = parseInt((timer - time) % 1000);
            ms = ms < 100 ? ms < 10 ? '00' + ms : '0' + ms : ms;
        }, 1) //1ms刷新一次，可以修改
    } else if (btn1.innerHTML === '停止') {
        //停止计时器
        btn2.disabled = false;
        btn1.innerHTML = '复原';
        window.clearInterval(t);
    } else {
        //计时器的复原
        btn2.disabled = true;
        btn1.innerHTML = '开始';
        hour.innerHTML = '00';
        minute.innerHTML = '00';
        second.innerHTML = '00';
    }
});
btn2.addEventListener('click', function () {
    clear.disabled = false;
    const li = document.createElement('li');    //创建li节点
    li.innerHTML = hour.innerHTML + ':' + minute.innerHTML + ':' + second.innerHTML + '.' + ms
        + "<a href='javascript:;'>删除</a></a>";
    if (data.innerHTML === '暂无！') {
        data.innerHTML = '';    //清空ol节点内所以内容
    }
    data.appendChild(li);   //添加li节点
    const a = li.querySelector('a');
    a.addEventListener('click', function () {
        //删除该行数据，找a爷节点(ol节点)删除a父节点(li节点)
        a.parentNode.parentNode.removeChild(a.parentNode);
    })
});
clear.addEventListener('click', function () {
    //清空记录中所有数据
    clear.disabled = true;
    data.innerHTML = '暂无！';
})
