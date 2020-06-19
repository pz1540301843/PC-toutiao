/* 
    简易 消息控件的实现
    @options.msg 提示的信息 默认为空
    @options.duartion  提示的时间 默认是 3s
*/
let isClick = true
function Message(options = {msg :""}) {
   
    // 提示信息
    if(isClick) {
        let msg = options.msg;
        // 提示信息消失的时间
        let duration = options.duration || 3000
        // 查看传过来的信息
        // alert(msg)
    
        // 创建一个提示元素
        let tipEl = document.createElement("div")
        tipEl.innerHTML = msg
        tipEl.classList.add("tt-message")
        document.body.appendChild(tipEl)
        isClick = false
        setTimeout(()=>{
            document.body.removeChild(tipEl)
            isClick = true
        },duration)
        console.log(msg,duration)
    }
    
    
}
export { Message }