$(function () {
    let pre = $('#pre a')
    let a = $('.page a')
    let next = $("#next a")
    a.on('click', function (e) {
         let page = $(this).data("page")
         console.log(page)
        $(this).parent('li').addClass('active').siblings('li').removeClass("active")
        $.ajax({
            url: '/admin/order/lists',
            data: {
                page
            },
            success: function (data) {
                let str = `<tr>
                <th>订单号</th>
                <th>姓名</th>
                <th>电话</th>
                <th>商品描述</th>
                <th>总件数</th>
                <th>总价格</th>
                <th>操作</th>
                            </tr>`
                $.each(data.orderlist, function (index, item) {
                    let str1 ;
                    $.each(item.cartlist, (index, items) => {
                        str1 = ` <td style="width: 40%;">
                            <div>商品名:${items.title}</div>
                            <Div>价格:${items.price}</Div>
                            <Div>  件数${items.count}</Div>
                    </td>`
                    })
                    str = str +
                        `<tr>
                        <td>${item._id}</td>
                        <td>${item.user.username}</td>
                        <td>${item.user.tel}</td>
                            `+ str1 +
                            `
                                <td>${item.sumCount}</td>
                                <td>${item.sumPrice}</td>
                        <td>
                            <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                            <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                        </td>
                    </tr>
                        `
                        console.log(str)
                })
                $('.table tbody').empty().append(str)
                window.history.pushState(null, null, "?page=" + page)
            //    console.log( $(location).attr('href','http://localhost:4000/admin/shop/list?page=2'));//跳转到新的地址
            },
            type: "GET",
            timeout: 3000
        })
        return false;
    })
    pre.on('click', function(e) {
        let page = $('.pagination li.active a').data("page")
        if(page > 1){
            page -= 1;
            $('.pagination li.active a').parent().prev().addClass('active').siblings().removeClass('active')
        }
        $.ajax({
            url: '/admin/order/lists',
            data: {
                page
            },
            success: function (data) {
                let str = `<tr>
                <th>订单号</th>
                <th>姓名</th>
                <th>电话</th>
                <th>商品描述</th>
                <th>总件数</th>
                <th>总价格</th>
                <th>操作</th>
                            </tr>`
                $.each(data.orderlist, function (index, item) {
                    let str1 ;
                    $.each(item.cartlist, (index, items) => {
                        str1 = ` <td style="width: 40%;">
                            <div>商品名:${items.title}</div>
                            <Div>价格:${items.price}</Div>
                            <Div>  件数${items.count}</Div>
                    </td>`
                    })
                    str = str +
                        `<tr>
                        <td>${item._id}</td>
                        <td>${item.user.username}</td>
                        <td>${item.user.tel}</td>
                            `+ str1 +
                            `
                                <td>${item.sumCount}</td>
                                <td>${item.sumPrice}</td>
                        <td>
                            <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                            <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                        </td>
                    </tr>
                        `
                        console.log(str)
                })
                $('.table tbody').empty().append(str)
                window.history.pushState(null, null, "?page=" + page)
            //    console.log( $(location).attr('href','http://localhost:4000/admin/shop/list?page=2'));//跳转到新的地址
            },
            type: "GET",
            timeout: 3000
        })
        return false;
    })

    next.on('click', function(e) {
        let page = $('.pagination li.active a').data("page")
        let maxSize = next.parent().prev().text()
        if(page < maxSize){
            page += 1;
            $('.pagination li.active a').parent().next().addClass('active').siblings().removeClass('active')
        }
        $.ajax({
            url: '/admin/order/lists',
            data: {
                page
            },
            success: function (data) {
                let str = `<tr>
                <th>订单号</th>
                <th>姓名</th>
                <th>电话</th>
                <th>商品描述</th>
                <th>总件数</th>
                <th>总价格</th>
                <th>操作</th>
                            </tr>`
                $.each(data.orderlist, function (index, item) {
                    let str1 ;
                    $.each(item.cartlist, (index, items) => {
                        str1 = ` <td style="width: 40%;">
                            <div>商品名:${items.title}</div>
                            <Div>价格:${items.price}</Div>
                            <Div>  件数${items.count}</Div>
                    </td>`
                    })
                    str = str +
                        `<tr>
                        <td>${item._id}</td>
                        <td>${item.user.username}</td>
                        <td>${item.user.tel}</td>
                            `+ str1 +
                            `
                                <td>${item.sumCount}</td>
                                <td>${item.sumPrice}</td>
                        <td>
                            <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                            <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                        </td>
                    </tr>
                        `
                        console.log(str)
                })
                $('.table tbody').empty().append(str)
                window.history.pushState(null, null, "?page=" + page)
            //    console.log( $(location).attr('href','http://localhost:4000/admin/shop/list?page=2'));//跳转到新的地址
            },
            type: "GET",
            timeout: 3000
        })
        return false;
    })
    window.addEventListener('popstate', function(){
        let page = window.location.href.split("=")[1]
       $.ajax({
            url: '/admin/order/lists',
            data: {
                page
            },
            success: function (data) {
                let str = `<tr>
                <th>订单号</th>
                <th>姓名</th>
                <th>电话</th>
                <th>商品描述</th>
                <th>总件数</th>
                <th>总价格</th>
                <th>操作</th>
                            </tr>`
                $.each(data.orderlist, function (index, item) {
                    let str1 ;
                    $.each(item.cartlist, (index, items) => {
                        str1 = `
                        <td style="width: 40%;">
                            <div>商品名:${items.title}</div>
                            <Div>价格:${items.price}</Div>
                            <Div>  件数${items.count}</Div>
                        </td>`
                    })
                    str = str +
                        `<tr>
                        <td>${item._id}</td>
                        <td>${item.user.username}</td>
                        <td>${item.user.tel}</td>
                            `+ str1 +
                            `
                                <td>${item.sumCount}</td>
                                <td>${item.sumPrice}</td>
                        <td>
                            <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                            <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                        </td>
                    </tr>
                        `
                        console.log(str)
                })
                $('.table tbody').empty().append(str)
                window.history.pushState(null, null, "?page=" + page)
            //    console.log( $(location).attr('href','http://localhost:4000/admin/shop/list?page=2'));//跳转到新的地址
            },
            type: "GET",
            timeout: 3000
        })
    })
});    