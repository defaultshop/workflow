<template>
    <div>
        <child-header></child-header>

        <div class="content-box padd">
            <div class="title-bar">
                <span class="title">报名咨询</span>
            </div>
            <div class="info-list">
                <ul>
                    <li v-for="(item,i) in arr_data" :key="i">
                        <span class="tag blue">{{$common.schoolTypeFormat(item.schoolType)}}</span>
                        <span class="name">{{item.name}}： {{item.contactPerson}}</span>
                        <span class="tel">{{item.contactTell}}</span>
                        <span class="adress">学校地址：{{item.address}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <child-footer></child-footer>

    </div>
</template>

<script src='./ApplyConsult.js'></script>
