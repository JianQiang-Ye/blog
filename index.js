// 监听鼠标滚动事件
setTimeout(function(){
    scrollEvent()
},10)

window.onscroll = function (e) {
    var y = window.scrollY // 获取滚动条的高度
    var top = document.getElementById('topNavBar')
    if (y > 0) {
        top.classList.add('sticky') //添加一个类名
    } else {
        top.classList.remove('sticky') // 去除一个类名
    }

    scrollEvent()
}
function scrollEvent(){
    // 当页面滚动到某个栏目时，导航栏会自动高亮
    let specificTags = document.querySelectorAll('[auto-highlight]')
    let minIndex = 0
    for (let i = 0; i < specificTags.length; i++) {
        if (Math.abs(window.scrollY - specificTags[i].offsetTop) < Math.abs(window.scrollY - specificTags[minIndex].offsetTop)) {
            minIndex = i
        }
    }
    let aTags = document.querySelectorAll('nav ul li a')
    for(let i=0;i<aTags.length;i++){
        aTags[i].classList.remove('highlight')
    }
    let id = specificTags[minIndex].id // 此时的minindex就是离窗口最近的元素
    let currentNavTag = document.querySelector('a[href="#'+id+'"]') // a[href="#skills"]
    currentNavTag.classList.add('highlight')

    // 当页面下滑到某个页面时，下面的板块会滑上来
    specificTags[minIndex].classList.add('sildeUp')
}

// 鼠标移到作品时，出现下拉菜单栏
// let liTags = document.getElementsByClassName('menuTigger')
let liTags = document.querySelectorAll('nav ul li.menuTigger') // 获取元素的选择器
for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (e) {//当鼠标移进去时,下面代码就会执行
        e.currentTarget.classList.add('activeFromLi')
        // 要用target或currenttarget,不能用litags[i]
    }
    liTags[i].onmouseleave = function (e) {
        e.currentTarget.classList.remove('activeFromLi')
    }
}

// 导航栏点击之后跳转
// 先监听点击事件
let aTags = document.getElementsByClassName('pageJump')
for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (e) {
        let a = e.target
        e.preventDefault()  // 禁用事件，注意这个是用在事件上的，不是用在元素上的
        let href = a.getAttribute('href') // 注意这里不能用a.href，会带有HTTP协议
        let element = document.querySelector(href)
        let elementY = element.offsetTop // 然后获取元素的高度，用元素.offsetTop来获取.不能用getBoundingClientRect
        // window.scrollTo(0,elementY-60) // 然后用window.scrollTop(0,100)来跳到该位置,第一个参数是x坐标，第二个坐标是y坐标
        let currentTop = window.scrollY // 当前的屏幕高度
        let targetTop = elementY - 60 // 目标屏幕高度
        let t = Math.abs(((targetTop - currentTop) / 100) * 200) // 每100px用0.5s
        if (t > 1000) t = 1000

        // let n = 50 //  总共要动n次
        // let duration = t / n // 多少时间内完成一次
        // let distance = (targetTop - currentTop) / n // 每次移动的距离

        // let i = 0
        // let id = setInterval(function(){
        //     window.scrollTo(0,currentTop + distance * i)
        //     if(i === n){
        //         window.clearInterval(id)
        //         return
        //     }
        //     i++
        // },duration)

        /**
         * 
         * 此处使用tween.js来做缓动
         */
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);

        var coords = { x: 0, y: currentTop }; // Start at (0, 0)
        var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
            .to({ x: 0, y: targetTop }, t) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
            .onUpdate(function () { // Called after tween.js updates 'coords'.
                // Move 'box' to the position described by 'coords' with a CSS translation.
                window.scrollTo(0, coords.y)
            })
            .start(); // Start the tween immediately.
    }
}

// 下面做移动到某个板块导航栏会自动高亮

