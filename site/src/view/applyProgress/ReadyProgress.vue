<template>
    <div>
        <child-header></child-header>

        <div class="content-box padd">
            <div class="title-bar">
                <span class="title">报名进度</span>
            </div>
            <!--审核状态-->
            <!--通过-->
            <div class="audit-state pass">
                <div class="icon iconfont iconzhengchang"></div>
                <div class="title">提交成功</div>
                <div class="txt">{{data_applyProgress.auditFailRemark}}</div>
            </div>

            

            <div class="form-list no-padd">
                <div class="confirm-box mt">
                    <div class="subtitle">
                        儿童信息
                        <!-- <span class="arrow">
                            展开
                            <i class="iconfont"></i>
                        </span> -->
                    </div>
                    <Row>
                        <Col span="11" class="mr30">
                            <div class="label">姓名</div>
                            <div class="text">{{data_applyProgress.childrenName}}</div>
                        </Col>
                        <Col span="11" class="mr30">
                            <div class="label">儿童身份证号</div>
                            <div class="text">{{data_applyProgress.childrenCardId}}</div>
                        </Col>
                        <Col span="11" class="mr30">
                            <div class="label">户籍所在地</div>
                            <div class="text">{{data_applyProgress.childrenRegisterAddress}}</div>
                        </Col>
                    </Row>
                </div>
            </div>

            <div class="form-list no-padd">
                <div class="confirm-box mt">
                    <div class="subtitle">
                        监护人信息
                        <!-- <span class="arrow">
                            展开
                            <i class="iconfont"></i>
                        </span> -->
                    </div>
                    <Row>
                        <Col span="11" class="mr30">
                            <div class="label">姓名</div>
                            <div class="text">{{data_applyProgress.guardianName}}</div>
                        </Col>
                        <Col span="11" class="mr30">
                            <div class="label">联系方式</div>
                            <div class="text">{{data_applyProgress.guardianTell}}</div>
                        </Col>
                    </Row>
                </div>
            </div>

            <div class="form-list no-padd">
                <div class="confirm-box mt">
                    <div class="subtitle">
                        学校信息
                        <!-- <span class="arrow">
                            展开
                            <i class="iconfont"></i>
                        </span> -->
                    </div>
                    <Row>
                        <Col span="11" class="mr30" v-if="data_applyProgress.graduatedSchoolInfoName">
                            <div class="label">毕业小学</div>
                            <div class="text">{{data_applyProgress.graduatedSchoolInfoName}}</div>
                        </Col>
                        <Col span="11" class="mr30" v-else>
                            <div class="label">幼儿园所在地</div>
                            <div class="text">{{data_applyProgress.childSchoolInDevelopment ? '开发区' : '不在开发区'}}</div>
                        </Col>
                        <Col span="11" class="mr30">
                            <div class="label">志愿学校</div>
                            <div class="text">{{data_applyProgress.schoolName}}</div>
                        </Col>
                    </Row>
                </div>
            </div>

            
        </div>

        <child-footer></child-footer>
        
    </div>
</template>

<script src="./ReadyProgress.js"></script>
