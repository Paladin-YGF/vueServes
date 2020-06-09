$(function () {
            let pre = $('#pre a')
            let a = $('.page a')
            let next = $("#next a")
            a.on('click', function (e) {
                 let page = $(this).data("page")
                 console.log(page)
                $(this).parent('li').addClass('active').siblings('li').removeClass("active")
                $.ajax({
                    url: '/admin/shop/lists',
                    data: {
                        page
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
                                    <a class="btn btn-danger" href="/admin/order/delete/${item._id}">删除</a>
                                </td>
                            </tr>
                                `
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
                    url: '/admin/shop/lists',
                    data: {
                        page
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
                                    <a class="btn btn-danger" href="/admin/order/delete/${item._id}">删除</a>
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
                let maxSize = next.parent().prev().text()
                
                if(page < maxSize){
                    page += 1;
                    $('.pagination li.active a').parent().next().addClass('active').siblings().removeClass('active')
                }
                    $.ajax({
                    url: '/admin/shop/lists',
                    data: {
                        page
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
                                    <a class="btn btn-danger" href="/admin/order/delete/${item._id}">删除</a>
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
            window.addEventListener('popstate', function(){
              
                let page = window.location.href.split("=")[1]
                $.ajax({
                    url: '/admin/shop/lists',
                    data: {
                        page
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
                                    <a class="btn btn-danger" href="/admin/order/delete/${item._id}">删除</a>
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
            })
        });    