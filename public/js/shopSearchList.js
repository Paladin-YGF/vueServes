
$(function () {
    let pre = $('#pre a')
    let a = $('.page a')
    let next = $("#next a")
    a.on('click', function (e) {
         let page = $(this).data("page")
         let classify = a.data("classify")
        $(this).parent('li').addClass('active').siblings('li').removeClass("active")
        $.ajax({
            url: '/admin/shop/searchs',
            data: {
                page,
                classify
            },
            success: function (data) {
                let str = `<tr>
                                 <th>商品id</th>
                                 <th>商品名</th>
                                 <th>价格</th>
                                 <th>分类</th>
                                 <th>图品路径</th>
                                 <th>产品图片</th>
                                 <th>类型</th>
                                 <th>操作</th>
                            </tr>`
                $.each(data.data, function (index, item) {
                    str = str +
                        `<tr>
                        <td>${item._id}</td>
                        <td>${item.title}</td>
                        <td>${item.price}</td>

                        <td>${item.classify}</td>
                        <td>${item.img}</td>
                        <td>
                            <img src=${item.img} height="80" />
                        </td>
                        <td>${item.types}</td>
                        <td>
                            <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                            <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                        </td>
                    </tr>
                        `
                })
                $('.table tbody').empty().append(str)
                window.history.pushState(null, null, "?page=" + page)
            },
            type: "GET",
            timeout: 3000
        })
        return false;
    })
    pre.on('click', function(e) {
        let page = $('.pagination li.active a').data("page")
        let classify = $('.pagination li.active a').data("classify")
        console.log(page,classify)
        if(page > 1){
            page -= 1;
            $('.pagination li.active a').parent().prev().addClass('active').siblings().removeClass('active')
        }
            $.ajax({
            url: '/admin/shop/searchs',
            data: {
                page,
                classify
            },
            success: function (data) {
                let str = `<tr>
                                 <th>商品id</th>
                                 <th>商品名</th>
                                 <th>价格</th>
                                 <th>分类</th>
                                 <th>图品路径</th>
                                 <th>产品图片</th>
                                 <th>类型</th>
                                 <th>操作</th>
                            </tr>`
                $.each(data.data, function (index, item) {
                    str = str +
                        `<tr>
                        <td>${item._id}</td>
                        <td>${item.title}</td>
                        <td>${item.price}</td>

                        <td>${item.classify}</td>
                        <td>${item.img}</td>
                        <td>
                            <img src=${item.img} height="80" />
                        </td>
                        <td>${item.types}</td>
                        <td>
                            <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                            <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                        </td>
                    </tr>
                        `
                })
                $('.table tbody').empty().append(str)
                window.history.pushState(null, null, "?page=" + page)
            },
            type: "GET",
            timeout: 3000
        })
        return false;
    })

    next.on('click', function(e) {
        let page = $('.pagination li.active a').data("page")
        let classify = $('.pagination li.active a').data("classify")
        let maxSize = next.parent().prev().text()
        if(page < maxSize){
            page += 1;
            $('.pagination li.active a').parent().next().addClass('active').siblings().removeClass('active')
        }
            $.ajax({
            url: '/admin/shop/searchs',
            data: {
                page,
                classify
            },
            success: function (data) {
                let str = `<tr>
                                 <th>商品id</th>
                                 <th>商品名</th>
                                 <th>价格</th>
                                 <th>分类</th>
                                 <th>图品路径</th>
                                 <th>产品图片</th>
                                 <th>类型</th>
                                 <th>操作</th>
                            </tr>`
                $.each(data.data, function (index, item) {
                    str = str +
                        `<tr>
                        <td>${item._id}</td>
                        <td>${item.title}</td>
                        <td>${item.price}</td>

                        <td>${item.classify}</td>
                        <td>${item.img}</td>
                        <td>
                            <img src=${item.img} height="80" />
                        </td>
                        <td>${item.types}</td>
                        <td>
                            <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                            <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                        </td>
                    </tr>
                        `
                })
                $('.table tbody').empty().append(str)
                window.history.pushState(null, null, "?page=" + page)
            },
            type: "GET",
            timeout: 3000
        })
        return false;
    })
    window.addEventListener('popstate',function(){
        let arr = window.location.href.split("?")
        let classify = $('.pagination li.active a').data("classify")
        if(arr[1].includes('page')){
            let page = arr[1].split('=')[1]
            $.ajax({
                url: '/admin/shop/searchs',
                data: {
                    page,
                    classify
                },
                success: function (data) {
                    let str = `<tr>
                                     <th>商品id</th>
                                     <th>商品名</th>
                                     <th>价格</th>
                                     <th>分类</th>
                                     <th>图品路径</th>
                                     <th>产品图片</th>
                                     <th>类型</th>
                                     <th>操作</th>
                                </tr>`
                    $.each(data.data, function (index, item) {
                        str = str +
                            `<tr>
                            <td>${item._id}</td>
                            <td>${item.title}</td>
                            <td>${item.price}</td>
    
                            <td>${item.classify}</td>
                            <td>${item.img}</td>
                            <td>
                                <img src=${item.img} height="80" />
                            </td>
                            <td>${item.types}</td>
                            <td>
                                <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                                <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                            </td>
                        </tr>
                            `
                    })
                    $('.table tbody').empty().append(str)
                    $('#' + page).parent().addClass('active').siblings().removeClass('active')
                },
                type: "GET",
                timeout: 3000
            })
        }else {
            console.log(arr[1])
            let page = 1
            $.ajax({
                url: '/admin/shop/searchs',
                data: {
                    page,
                    classify
                },
                success: function (data) {
                    let str = `<tr>
                                     <th>商品id</th>
                                     <th>商品名</th>
                                     <th>价格</th>
                                     <th>分类</th>
                                     <th>图品路径</th>
                                     <th>产品图片</th>
                                     <th>类型</th>
                                     <th>操作</th>
                                </tr>`
                    $.each(data.data, function (index, item) {
                        str = str +
                            `<tr>
                            <td>${item._id}</td>
                            <td>${item.title}</td>
                            <td>${item.price}</td>
    
                            <td>${item.classify}</td>
                            <td>${item.img}</td>
                            <td>
                                <img src=${item.img} height="80" />
                            </td>
                            <td>${item.types}</td>
                            <td>
                                <a class="btn btn-primary" href="/admin/shop/update/${item._id}" style="margin: 15px 0;">编辑</a>
                                <a class="btn btn-danger" href="/admin/shop/delete/${item._id}">删除</a>
                            </td>
                        </tr>
                            `
                    })
                    $('.table tbody').empty().append(str)
                    $('#' + page).parent().addClass('active').siblings().removeClass('active')
                },
                type: "GET",
                timeout: 3000
            })
        }
    })
});    
