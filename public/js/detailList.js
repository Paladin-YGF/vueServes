$(function () {
    let pre = $('#pre a')
    let a = $('.page a')
    let next = $("#next a")
    a.on('click', function (e) {
         let page = $(this).data("page")
         console.log(page)
        $(this).parent('li').addClass('active').siblings('li').removeClass("active")
        $.ajax({
            url: '/admin/shopInfo/lists',
            data: {
                page
            },
            success: function (data) {
                console.log(data)
                let str = `<tr>
                <th>商品Id号</th>
                <th>商品名</th>
                <th>原价格</th>
                <th>商品详情轮播图</th>
                <th>操作</th>
                            </tr>`
                $.each(data.data, function (index, item) {
                    let str1 = '' ;
                    console.log(item)
                    $.each(item.swiperImg, (index, items) => {
                        str1 += `
                        <div style="width: 25%; float: left;" ><img src = '${items}' width="80px"/></div>
                    `
                    console.log(items)
                    })
                    str = str +
                        `<tr>
                        <td>${item.shopId}</td>
                    <td>${item.title}</td>
                    <td>${item.oldPrice}</td>
                            <td style="width: 30%;">`+ 
                            str1 
                            +
                            `</td>
                                <td>
                                <a class="btn btn-danger" href="/admin/detail/delete/${item._id}">删除</a>
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
            url: '/admin/shopInfo/lists',
            data: {
                page
            },
            success: function (data) {
                console.log(data)
                let str = `<tr>
                <th>商品Id号</th>
                <th>商品名</th>
                <th>原价格</th>
                <th>商品详情轮播图</th>
                <th>操作</th>
                            </tr>`
                $.each(data.data, function (index, item) {
                    let str1 = '' ;
                    console.log(item)
                    $.each(item.swiperImg, (index, items) => {
                        str1 += `
                        <div style="width: 25%; float: left;" ><img src = '${items}' width="80px"/></div>
                    `
                    console.log(items)
                    })
                    str = str +
                        `<tr>
                        <td>${item.shopId}</td>
                    <td>${item.title}</td>
                    <td>${item.oldPrice}</td>
                            <td style="width: 30%;">`+ 
                            str1 
                            +
                            `</td>
                                <td>
                                <a class="btn btn-danger" href="/admin/detail/delete/${item._id}">删除</a>
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
            url: '/admin/shopInfo/lists',
            data: {
                page
            },
            success: function (data) {
                console.log(data)
                let str = `<tr>
                <th>商品Id号</th>
                <th>商品名</th>
                <th>原价格</th>
                <th>商品详情轮播图</th>
                <th>操作</th>
                            </tr>`
                $.each(data.data, function (index, item) {
                    let str1 = '' ;
                    console.log(item)
                    $.each(item.swiperImg, (index, items) => {
                        str1 += `
                        <div style="width: 25%; float: left;" ><img src = '${items}' width="80px"/></div>
                    `
                    console.log(items)
                    })
                    str = str +
                        `<tr>
                        <td>${item.shopId}</td>
                    <td>${item.title}</td>
                    <td>${item.oldPrice}</td>
                            <td style="width: 30%;">`+ 
                            str1 
                            +
                            `</td>
                                <td>
                                <a class="btn btn-danger" href="/admin/detail/delete/${item._id}">删除</a>
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
            url: '/admin/shopInfo/lists',
            data: {
                page
            },
            success: function (data) {
                console.log(data)
                let str = `<tr>
                <th>商品Id号</th>
                <th>商品名</th>
                <th>原价格</th>
                <th>商品详情轮播图</th>
                <th>操作</th>
                            </tr>`
                $.each(data.data, function (index, item) {
                    let str1 = '' ;
                    console.log(item)
                    $.each(item.swiperImg, (index, items) => {
                        str1 += `
                        <div style="width: 25%; float: left;" ><img src = '${items}' width="80px"/></div>
                    `
                    console.log(items)
                    })
                    str = str +
                        `<tr>
                        <td>${item.shopId}</td>
                    <td>${item.title}</td>
                    <td>${item.oldPrice}</td>
                            <td style="width: 30%;">`+ 
                            str1 
                            +
                            `</td>
                                <td>
                                <a class="btn btn-danger" href="/admin/detail/delete/${item._id}">删除</a>
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