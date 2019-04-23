!function(){

    var view = document.querySelector('.message')

    // noinspection JSAnnotator
    var model = {
        initAV(){
            var APP_ID = 'Tznr1bLQU74upk5UeIgeCMrD-gzGzoHsz'
            var APP_KEY = 'IvXFrWzz4IHeR3y3Wsld7lfC'
            AV.init({appId: APP_ID, appKey: APP_KEY})
        },
        fetch(){
            var query = new AV.Query('Message')
            return query.find()
        },
        save(username,message){
            var TestObject = AV.Object.extend('Message');
            var testObject = new TestObject();

            return testObject.save({username,message})
        }
    }

    // noinspection JSAnnotator
    var controller = {
        view: null,
        form: null,
        model: null,
        init:function(view,model){
            this.view = view
            this.model = model
            this.form = view.querySelector('form')
            this.model.initAV()
            this.loadMessages()
            this.bindEvent()
        },
        loadMessages(){
            this.model.fetch().then((array) => {
                array.forEach( (item) => {
                    var username = item.attributes.username
                    var message = item.attributes.message
                    console.log(username,message)
                    this.render(username,message)
                })
            })
        },
        bindEvent(){
            var myform = this.form
            myform.addEventListener('submit',(e)=>{
                e.preventDefault() // 阻止默认的刷新操作
                this.saveMessage(myform)
            })
        },
        saveMessage(myform){
            var message = myform.querySelector('input[message]').value
            var username = myform.querySelector('input[user]').value
            // noinspection JSAnnotator
            this.model.save(username, message).then((object) => {
                this.render(username,message)
                myform.querySelector('input[message]').value = ''
            })
        },
        render(username,message){
            console.log(1,2)
            var div = document.createElement('div')
            div.classList.add('messageBox')

            var span = document.createElement('span')
            span.classList.add('username')
            span.innerText = username + '：'+ message
            div.appendChild(span)

            var section = document.querySelector('.messageWrapper')
            section.appendChild(div)
        }
    }

    controller.init(view,model)
}()

