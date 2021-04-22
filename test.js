new Promise((resolve, reject) => {
    console.log("promise")
    resolve()
}).then(() => {	// 执行.then的时候生成一个promise是给最后一个.then的
                console.log("then1")
                new Promise((resolve, reject) => {
                    console.log("then1promise")
                    resolve()
                })
                .then(() => {// 执行这个.then的时候，生成的promise是下面一个then的
                    console.log("then1then1")
                })
                .then(() => {
                    console.log("then1then2")
                })
            })
    .then(() => {
        // 这个
        console.log("then2")
    })