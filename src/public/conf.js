var testHost = ['test.local.helianhealth.com'];
var testHost2 = ['mobileapi.test.lianlianbox.com'];
var testHost3 = ['pre.local.helianhealth.com'];
var onlineHost = ['mobileapi.helianhealth.com'];
var apiHost = '';
var aurl = '';
if (testHost.indexOf(location.hostname) >= 0) {
    apiHost = '//test.local.helianhealth.com:9696/manager';
    aurl = '/online';
}
if (testHost2.indexOf(location.hostname) >= 0) {
    apiHost = '//mobileapi.test.lianlianbox.com:8686/manager';
    aurl = '/online';
}
if (testHost3.indexOf(location.hostname) >= 0) {
    apiHost = '//pre.local.helianhealth.com:9697/manager';
    aurl = '/online';
}
if (onlineHost.indexOf(location.hostname) >= 0) {
    apiHost = '//management.helianhealth.com';
    aurl = '/online';
}
var conf = {
    aurl: aurl,
    sexp: 365 * 24 * 3600,
    api: {
        //上传图片
        upload: `${apiHost}/api/upload`,
        // 问卷
        post: `${apiHost}/api/answer/post`,
        save: `${apiHost}/api/answer/save`,
        query: `${apiHost}/api/survey/query`,
        list: `${apiHost}/api/survey/detail`,
        result: `${apiHost}/api/survey/result`,
        getExistUrl: `${apiHost}/api/survey/getExistUrl`,
        // 体检项目
        zone: `${apiHost}/app/userCoupon/zone`,
        detail: `${apiHost}/app/physical/examination/pkg/detail`,
        listByCpId: `${apiHost}/app/physical/examination/pkg/listByCpId`,
        getPackageInfo: `${apiHost}/app/examination/institutions/getPackageInfo`,
        getInstByDistance: `${apiHost}/app/examination/institutions/getInstByDistance`,
        // 医生
        doctors: `${apiHost}/app/healthService/doctors`,
        // 人工预约弹窗保存
        zoneUserInfo: `${apiHost}/app/zone/add/zoneUserInfo`,
        // 体脂数据
        fat: `${apiHost}/app/equipment/fat/info`,
        updatefat: `${apiHost}/app/equipment/fat/update`,
        // 体适能报告
        fitness: `${apiHost}/app/physcial/fitness/detail`,
        fitnesslatest: `${apiHost}/app/physcial/fitness/latest`,
        getFitnessUnscramble: `${apiHost}/app/report/getFitnessUnscramble`,
        // 基因检测
        report: `${apiHost}/app/genetest/getGenerateReport`,
        // 报告详情
        reportDetail: `${apiHost}/admin/task/reportDetail`,
        
        newestreportDetail: `${apiHost}/app/report/unscramble`,
        // 服务包详情
        pkgItems: `${apiHost}/app/healthService/pkgItems`,
        packageInfo: `${apiHost}/app/healthService/packageInfo`,
        serviceTeam: `${apiHost}/app/healthService/serviceTeam`,
        // 初步评估结果
        resultget: `${apiHost}/app/index/user/access/result/get`,
        templatelist: `${apiHost}/app/index/user/plan/template/list`,
        templateadd: `${apiHost}/app/index/user/plan/template/add`,
        // 获取用户方案总览
        overview: `${apiHost}/app/plan/v6/overview`,
        addPlanForUpdate: `${apiHost}/app/plan/v6/home/addPlanForUpdate`,
        // 获取用户最新群组
        getUserTeam: `${apiHost}/app/user/getUserTeam`,
        // 评级
        ratingresult: `${apiHost}/app/index/user/rating/result`,
        // 运营活动
        complaintadd: `${apiHost}/app/activity/complaint/add`,
        teasureInfo: `${apiHost}/app/activity/get/teasureInfo`,
        teasureUser: `${apiHost}/app/activity/add/teasureUser`,
        teasureShare: `${apiHost}/app/activity/get/teasureShare`,
        teasureRewardCode: `${apiHost}/app/activity/get/teasureRewardCode`,
        userServicePackage: `${apiHost}/app/activity/get/userServicePackage`,
        userServicePackageShare: `${apiHost}/app/activity/get/userServicePackageShare`,
        userServicePackagepost: `${apiHost}/app/activity/add/userServicePackage`,
        // 加速卡
        speedCard: `${apiHost}/app/mallProduct/speedCard/list`,
        getDuibaUrl: `${apiHost}/api/duiba/getDuibaUrl`,
        autoLogin: `${apiHost}/api/duiba/autoLogin`,
        // 我的财富
        coins: `${apiHost}/app/user/wealth/coins`,
        golds: `${apiHost}/app/user/wealth/golds`,
        score: `${apiHost}/app/user/wealth/score`,
        exchange: `${apiHost}/app/user/wealth/exchange`,
        // 兑换
        orderlist: `${apiHost}/app/mall/order/list`,
        orderdetail: `${apiHost}/app/mall/order/detail`,
        // 商品
        goodslist: `${apiHost}/app/mall/company/goods/list`,
        goodsdetail: `${apiHost}/app/mall/company/goods/get`,
        goodsexchange: `${apiHost}/app/mall/order/exchange`,

    }
};

module.exports = conf;
