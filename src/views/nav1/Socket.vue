<template>
    <div>From server-> {{msg}}</div>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        name: "Socket",
        data (){
            return {
                msg:'Default'
            }
        },
        // mounted () {
        //     var $this = this;
        //     var socketConfig = {
        //         path: '/api/socketio'
        //     };
        //     var socket = io.connect('localhost:8888', socketConfig);
        //     socket.on('cardChange', function (data) {
        //         console.log('msg', data);
        //         $this.msg = data.msg;
        //     });
        //     socket.emit('cardChange', {msg:'hello server'})
        // }
    }
</script>

<style scoped>

</style>