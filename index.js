// 监听鼠标滚动事件
window.onscroll = function(e){
    var y = window.scrollY // 获取滚动条的高度
    var top = document.getElementById('topNavBar')
    if(y > 0){
        top.classList.add('sticky') //添加一个类名
    }else{
        top.classList.remove('sticky') // 去除一个类名
    }
}

// 鼠标移到作品时，出现下拉菜单栏
// let liTags = document.getElementsByClassName('menuTigger')
let liTags = document.querySelectorAll('nav ul li.menuTigger') // 获取元素的选择器
for(let i = 0;i<liTags.length;i++){
    liTags[i].onmouseenter = function(e) {//当鼠标移进去时,下面代码就会执行
        e.currentTarget.classList.add('activeFromLi')
        // 要用target或currenttarget,不能用litags[i]
    }
    liTags[i].onmouseleave = function(e){
        e.currentTarget.classList.remove('activeFromLi')
    } 
}

// 导航栏点击之后跳转
// 先监听点击事件
let aTags = document.getElementsByClassName('pageJump')
for(let i=0;i<aTags.length;i++){
    aTags[i].onclick = function(e){
        let a = e.target
        e.preventDefault()  // 禁用事件，注意这个是用在事件上的，不是用在元素上的
        let href  = a.getAttribute('href') // 注意这里不能用a.href，会带有HTTP协议
        let element = document.querySelector(href)
        let elementY = element.offsetTop // 然后获取元素的高度，用元素.offsetTop来获取.不能用getBoundingClientRect
        window.scrollTo(0,elementY-60) // 然后用window.scrollTop(0,100)来跳到该位置,第一个参数是x坐标，第二个坐标是y坐标
    }
}