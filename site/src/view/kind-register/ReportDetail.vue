<template>
  <div>
    <!-- 幼儿信息 -->
    <div class="confirm-box mt clearfix" v-if="data_info.childIsFill">
      <div class="subtitle">幼儿信息</div>
      <div>
        <div class="item" v-if="data_info.childrenName">
          <div class="label">幼儿姓名</div>
          <div class="text">{{ data_info.childrenName }}</div>
        </div>
        <div class="item" v-if="data_info.childrenCardId">
          <div class="label">幼儿身份证号</div>
          <div class="text">{{ data_info.childrenCardId }}</div>
        </div>
        <div class="item" v-if="data_info.childrenRegisterAddress">
          <div class="label">户籍所在地</div>
          <div class="text">{{ data_info.childrenRegisterAddress }}</div>
        </div>
        <div class="item" v-if="data_info.childrenLiveAddress">
          <div class="label">家庭详细地址</div>
          <div class="text">{{ data_info.childrenLiveAddress }}</div>
        </div>
      </div>
    </div>
    <!-- 父母信息 -->
    <div class="confirm-box clearfix" v-if="data_info.parentsIsFill">
      <div class="subtitle">父母信息</div>
      <div>
        <div class="item" v-if="data_info.fatherName">
          <div class="label">父亲姓名</div>
          <div class="text">{{ data_info.fatherName }}</div>
        </div>
        <div class="item" v-if="data_info.fatherCardId">
          <div class="label">父亲身份证号</div>
          <div class="text">{{ data_info.fatherCardId }}</div>
        </div>
        <div class="item" v-if="data_info.fatherTell">
          <div class="label">手机号码</div>
          <div class="text">{{ data_info.fatherTell }}</div>
        </div>
        <div class="item" v-if="data_info.fatherWorkUnit">
          <div class="label">工作单位</div>
          <div class="text">{{ data_info.fatherWorkUnit }}</div>
        </div>
        <div class="item" v-if="data_info.fatherNatureOfWorkUnit">
          <div class="label">工作单位性质</div>
          <div class="text">
            {{ allEnum && allEnum.NatureOfWorkUnit.find(x => x.id === data_info.fatherNatureOfWorkUnit).value }}
          </div>
        </div>

        <div class="item" v-if="data_info.motherName">
          <div class="label">母亲姓名</div>
          <div class="text">{{ data_info.motherName }}</div>
        </div>
        <div class="item" v-if="data_info.motherCardId">
          <div class="label">母亲身份证号</div>
          <div class="text">{{ data_info.motherCardId }}</div>
        </div>
        <div class="item" v-if="data_info.motherTell">
          <div class="label">手机号码</div>
          <div class="text">{{ data_info.motherTell }}</div>
        </div>
        <div class="item" v-if="data_info.motherWorkUnit">
          <div class="label">工作单位</div>
          <div class="text">{{ data_info.motherWorkUnit }}</div>
        </div>
        <div class="item" v-if="data_info.motherNatureOfWorkUnit">
          <div class="label">工作单位性质</div>
          <div class="text">
            {{ allEnum && allEnum.NatureOfWorkUnit.find(x => x.id === data_info.motherNatureOfWorkUnit).value }}
          </div>
        </div>
      </div>
    </div>
    <!-- 高层次人才信息 -->
    <div class="confirm-box clearfix" v-if="data_info.personnelIsFill">
      <div class="subtitle">高层次人才信息</div>
      <div>
        <div class="clearfix">
          <div class="item" v-if="data_info.personnelName">
            <div class="label">姓名</div>
            <div class="text">{{ data_info.personnelName }}</div>
          </div>
          <div class="item" v-if="data_info.personnelCardId">
            <div class="label">身份证号码</div>
            <div class="text">{{ data_info.personnelCardId }}</div>
          </div>
          <div class="item" v-if="data_info.personnelCardNo">
            <div class="label">人才卡号</div>
            <div class="text">{{ data_info.personnelCardNo }}</div>
          </div>
          <div class="item" v-if="data_info.personnelType">
            <div class="label">人才类别</div>
            <div class="text">{{ data_info.personnelType }}</div>
          </div>
          <div class="item" v-if="data_info.personnelNumber">
            <div class="label">人才编号</div>
            <div class="text">{{ data_info.personnelNumber }}</div>
          </div>
        </div>
        <div class="clearfix">
          <div class="item" v-if="data_info.personnelCertificateBook">
            <div class="label">人才证书照片</div>
            <div class="file-item">
              <div class="img">
                <viewer>
                  <img :src="fileUrl + data_info.personnelCertificateBook + '&filter=default'" alt />
                </viewer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 不动产信息 -->
    <div class="confirm-box clearfix" v-if="data_info.houseIsFill">
      <div class="subtitle">房产信息</div>
      <div>
        <div class="clearfix">
          <div class="item" v-if="data_info.houseStatus">
            <div class="label">产权情况</div>
            <div class="text">
              {{ allEnum && allEnum.HouseStatus.find(x => x.id === data_info.houseStatus).value }}
            </div>
          </div>
          <div class="item" v-if="data_info.houseRelationType">
            <div class="label">房产所有人与幼儿的关系</div>
            <div class="text">
              {{ allEnum && allEnum.HouseRelationType.find(x => x.id === data_info.houseRelationType).value }}
            </div>
          </div>
          <div class="item" v-if="data_info.houseName">
            <div class="label">产权所有人姓名</div>
            <div class="text">{{ data_info.houseName }}</div>
          </div>
          <div class="item" v-if="data_info.houseCardId">
            <div class="label">身份证号</div>
            <div class="text">{{ data_info.houseCardId }}</div>
          </div>
          <div class="item" v-if="data_info.houseRegisterAddress">
            <div class="label">不动产所有人户籍地</div>
            <div class="text">{{ data_info.houseRegisterAddress }}</div>
          </div>
          <div class="item" v-if="data_info.houseRegisterTell">
            <div class="label">产权所有人手机号</div>
            <div class="text">{{ data_info.houseRegisterTell }}</div>
          </div>
          <div class="item" v-if="data_info.houseAddress">
            <div class="label">房产坐落地址</div>
            <div class="text">{{ data_info.houseAddress }}</div>
          </div>
          <div class="item" v-if="data_info.houseResidentCommittee">
            <div class="label">所在居委</div>
            <div class="text">{{ data_info.houseResidentCommittee }}</div>
          </div>
          <div class="item" v-if="data_info.houseHaveStatus">
            <div class="label">不动产全权所有人</div>
            <div class="text">
              {{ allEnum && allEnum.HouseHaveStatus.find(x => x.id === data_info.houseHaveStatus).value }}
            </div>
          </div>
          <div class="item" v-if="data_info.houseRealEstateCertificateNo">
            <div class="label">不动产权证号</div>
            <div class="text">{{ data_info.houseRealEstateCertificateNo }}</div>
          </div>
        </div>
        <div class="clearfix">
          <div class="item" v-if="data_info.houseBook">
            <div class="label">不动产权证</div>
            <div class="file-item">
              <div class="img">
                <viewer>
                  <img :src="fileUrl + data_info.houseBook + '&filter=default'" alt />
                </viewer>
              </div>
            </div>
          </div>
          <div class="item" v-if="data_info.houseCertificateOfRegistrationBook">
            <div class="label">不动产预登记证明</div>
            <div class="file-item">
              <div class="img">
                <viewer>
                  <img :src="fileUrl + data_info.houseCertificateOfRegistrationBook + '&filter=default'" alt />
                </viewer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 附件信息 -->
    <div class="confirm-box clearfix" v-if="data_info.bookIsFill">
      <div class="subtitle">附件信息</div>
      <div>
        <div class="item" v-if="data_info.childrenHouseholdBookHome">
          <div class="label">户口本首页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookHome + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookParents">
          <div class="label">户口本父母信息页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookParents + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookFather">
          <div class="label">户口本父亲信息页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookMother">
          <div class="label">户口本母亲信息页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookMother + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookOneself">
          <div class="label">户口本幼儿信息页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookOneself + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.marriageCertificateBook">
          <div class="label">结婚证或离婚证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.marriageCertificateBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.institutionsAndUndertakingsBook">
          <div class="label">机关事业单位证明（单位盖章）</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.institutionsAndUndertakingsBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.unitUndertakingsBook">
          <div class="label">单位证明（单位盖章）</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.unitUndertakingsBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 志愿学校 -->
    <div class="confirm-box clearfix" v-if="data_info.schoolIsFill">
      <div class="subtitle">志愿学校</div>
      <div>
        <div class="item">
          <div class="label">是否服从调配</div>
          <div class="text">{{ data_info.isAcceptTransfer ? '是' : '否' }}</div>
        </div>
        <div class="item" v-if="data_info.schoolInfoId">
          <div class="label">志愿学校</div>
          <div class="text">{{ data_info.schoolName }}</div>
        </div>
        <div class="item" v-if="data_info.schoolInfoOne && data_info.schoolInfoOne.id">
          <div class="label">调配志愿一</div>
          <div class="text">{{ data_info.schoolInfoOne.name }}</div>
        </div>
        <div class="item" v-if="data_info.schoolInfoTwo && data_info.schoolInfoTwo.id">
          <div class="label">调配志愿二</div>
          <div class="text">{{ data_info.schoolInfoTwo.name }}</div>
        </div>
        <div class="item" v-if="data_info.schoolInfoThree && data_info.schoolInfoThree.id">
          <div class="label">调配志愿三</div>
          <div class="text">{{ data_info.schoolInfoThree.name }}</div>
        </div>
        <div class="item" v-if="data_info.schoolInfoFour && data_info.schoolInfoFour.id">
          <div class="label">调配志愿四</div>
          <div class="text">{{ data_info.schoolInfoFour.name }}</div>
        </div>
        <div class="item" v-if="data_info.schoolInfoFive && data_info.schoolInfoFive.id">
          <div class="label">调配志愿五</div>
          <div class="text">{{ data_info.schoolInfoFive.name }}</div>
        </div>
        <div class="item" v-if="data_info.schoolInfoSix && data_info.schoolInfoSix.id">
          <div class="label">调配志愿六</div>
          <div class="text">{{ data_info.schoolInfoSix.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import baseUrl from '@/api/env';
export default {
  props: {
    data_info: {
      default: {}
    }
  },
  data() {
    return {
      fileUrl: baseUrl + 'EOL/File/Map?id=',
      proofMaterialBooks: [],
      loanContractBooks: [],
      allEnum: {}
    };
  },
  mounted() {
    this.allEnum = JSON.parse(sessionStorage.getItem('all-enum'));
    if (this.data_info.proofMaterialBooks) {
      this.proofMaterialBooks = this.data_info.proofMaterialBooks.split('|');
    }

    if (this.data_info.loanContractBooks) {
      this.loanContractBooks = this.data_info.loanContractBooks.split('|');
      console.log(this.loanContractBooks);
    }
  }
};
</script>
