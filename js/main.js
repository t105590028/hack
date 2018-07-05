$(function () {
    class StopWatch {
        constructor () {
            this.startTime  = new Date(2018, 6, 7, 19, 30, 0, 0)
            this.stopTime = new Date(2018, 6, 8, 14, 30, 0, 0)
            // this.startTime  = new Date((new Date()).getTime() + 3000)
            // this.stopTime = new Date((new Date()).getTime() + 6000)
            this.intervalId = setInterval(() => this.update(), 20)
            this.previous = { hour: undefined, minute: undefined, second: undefined }
            this.text = { hour: '00', minute: '00', second: '00', centsecond: '00' }
            this.flags = [ false, false, false, false, false ]
        }
        update () {
            const now = (new Date()).getTime()
            const remainingMillisecond = this.stopTime.getTime() - now
            const centsecond = Math.floor(remainingMillisecond % 1000 / 10)
            const second = Math.floor(remainingMillisecond / 1000) % 60
            const minute = Math.floor(remainingMillisecond / 1000 / 60) % 60
            const hour = Math.floor(remainingMillisecond / 1000 / 3600)
            // 數字變動的觸發
            if (this.previous.hour !== hour) {
                this.previous.hour = hour
                this.text.hour = ('' + hour).length === 1 ? ('0' + hour) : ('' + hour)
            }
            if (this.previous.minute !== minute) {
                this.previous.minute = minute
                this.text.minute = ('' + minute).length === 1 ? ('0' + minute) : ('' + minute)
            }
            if (this.previous.second !== second) {
                this.previous.second = second
                this.text.second = ('' + second).length === 1 ? ('0' + second) : ('' + second)
            }
            this.text.centsecond = ('' + centsecond).length === 1 ? (':0' + centsecond) : (':' + centsecond)
            this.updateTimeDisplay()
            // 時間條件的觸發
            // 結束
            if (remainingMillisecond <= 0) {
                if(!this.flags[0]) {
                    this.flags[0] = true
                    $('#event-status').html('<pre class="text-2 text-center font-weight-bold"><span id="message">完成...了?</span></pre>')
                    $('#message').removeClass('flash animated').addClass('flash animated')
                    $('.one_').addClass('one_3')
                    $('.zero_').addClass('zero_3')
                    $('.two').addClass('two_')
                   
                }
                this.timeUp()
            } else if (hour === 0 && minute < 5) {
                if(!this.flags[1]) {
                    this.flags[1] = true
                    $('#event-status').html('<pre class="text-2 text-center font-weight-bold"><span id="message">只剩不到5分鐘啦QAO</span></pre>')
                    $('#message').removeClass('flash animated').addClass('flash animated')
                    $('.one_').addClass('one_2')
                    $('.zero_').addClass('zero_2')
                    $('.textt').addClass('text_2')
                }
            } else if (hour === 0 && minute < 30) {
                if(!this.flags[2]) {
                    this.flags[2] = true
                    $('#event-status').html('<pre class="text-2 text-center font-weight-bold"><span id="message">只剩不到30分鐘啦QQ</span></pre>')
                    $('#message').removeClass('flash animated').addClass('flash animated')
                    $('.one_').addClass('one_1')
                    $('.zero_').addClass('zero_1')
                    $('.textt').addClass('text_')
                }
            } else if (hour < 1) {
                if(!this.flags[3]) {
                    this.flags[3] = true
                    $('#event-status').html('<pre class="text-2 text-center font-weight-bold"><span id="message">只剩不到1小時啦QAO</span></pre>')
                    $('#message').removeClass('flash animated').addClass('flash animated')
                }
            } else if (this.startTime.getTime() <= now) {
                if(!this.flags[4]) {
                    this.flags[4] = true
                    $('#event-status').html('<pre class="text-2 text-center font-weight-bold"><span id="message">開始啦!!!</span></pre>')
                    $('#message').removeClass('flash animated').addClass('flash animated')
                }
            }
        }
        updateTimeDisplay() {
           
            $('#time-display').html(
                '<pre><span class="text-1">' + this.text.hour + ':' + this.text.minute + ':' + this.text.second + '</span>' +
                '<span class="text-2">' + this.text.centsecond + '</span><pre>'
            )
            $('#time-display2').html(
                '<pre><span class="text-3">' + this.text.hour + ':' + this.text.minute + ':' + this.text.second + '</span>' +
                '<span class="text-4">' + this.text.centsecond + '</span><pre>'
            )
        }
        timeUp () {
            clearInterval(this.intervalId)
            $('#time-display').html('<pre><span class="text-3 text-center">Time Up</span><pre>').removeClass().addClass('flash animated')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#time-display').removeClass();
            })
            $('#time-display2').html('<pre><span class="text-3 text-center">Time Up</span><pre>').removeClass().addClass('flash animated')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#time-display').removeClass();
            })
        }
    }
    new StopWatch()
})
