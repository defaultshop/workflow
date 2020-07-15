<template>
  <div>
    <div class="confirm-box mt clearfix" v-if="data_info.childIsFill">
      <!-- 儿童信息 -->
      <div class="subtitle">儿童信息</div>
      <div>
        <div class="item" v-if="data_info.childrenName">
          <div class="label">儿童姓名</div>
          <div class="text">{{ data_info.childrenName }}</div>
        </div>
        <div class="item" v-if="data_info.childrenCardId">
          <div class="label">儿童身份证号</div>
          <div class="text">{{ data_info.childrenCardId }}</div>
        </div>
        <div class="item" v-if="data_info.childrenPassport">
          <div class="label">护照号</div>
          <div class="text">{{ data_info.childrenPassport }}</div>
        </div>
        <div class="item" v-if="data_info.childrenRegisterAddress">
          <div class="label">户籍所在地</div>
          <div class="text">{{ data_info.childrenRegisterAddress }}</div>
        </div>
        <div class="item" v-if="data_info.childrenGraduateSchool">
          <div class="label">小学毕业学校</div>
          <div class="text">{{ data_info.childrenGraduateSchool }}</div>
        </div>
        <div class="item" v-if="data_info.schoolName">
          <div class="label">填报志愿</div>
          <div class="text">{{ data_info.schoolName }}</div>
        </div>
        <div class="item" v-if="data_info.childrenVaccinationBook">
          <div class="label">免疫预防接种证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenVaccinationBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
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
        <div class="item" v-if="data_info.fatherPassport">
          <div class="label">父亲护照号</div>
          <div class="text">{{ data_info.fatherPassport }}</div>
        </div>
        <div class="item" v-if="data_info.fatherRegisterAddress">
          <div class="label">户籍所在地</div>
          <div class="text">{{ data_info.fatherRegisterAddress }}</div>
        </div>
        <div class="item" v-if="data_info.fatherCountry">
          <div class="label">居留国家</div>
          <div class="text">{{ data_info.fatherCountry }}</div>
        </div>
        <div class="item" v-if="data_info.fatherTell">
          <div class="label">手机号码</div>
          <div class="text">{{ data_info.fatherTell }}</div>
        </div>

        <div class="item" v-if="data_info.motherName">
          <div class="label">母亲姓名</div>
          <div class="text">{{ data_info.motherName }}</div>
        </div>
        <div class="item" v-if="data_info.motherCardId">
          <div class="label">母亲身份证号</div>
          <div class="text">{{ data_info.motherCardId }}</div>
        </div>
        <div class="item" v-if="data_info.motherPassport">
          <div class="label">母亲护照号</div>
          <div class="text">{{ data_info.motherPassport }}</div>
        </div>
        <div class="item" v-if="data_info.motherRegisterAddress">
          <div class="label">户籍所在地</div>
          <div class="text">{{ data_info.motherRegisterAddress }}</div>
        </div>
        <div class="item" v-if="data_info.motherCountry">
          <div class="label">居留国家</div>
          <div class="text">{{ data_info.motherCountry }}</div>
        </div>
        <div class="item" v-if="data_info.motherTell">
          <div class="label">手机号码</div>
          <div class="text">{{ data_info.motherTell }}</div>
        </div>
      </div>
    </div>
    <!-- 户主信息 -->
    <div class="confirm-box clearfix" v-if="data_info.householderIsFill">
      <div class="subtitle">户主信息</div>
      <div>
        <div class="item" v-if="data_info.householderName">
          <div class="label">户主姓名</div>
          <div class="text">{{ data_info.householderName }}</div>
        </div>
        <div class="item" v-if="data_info.householderCardId">
          <div class="label">户主身份证号</div>
          <div class="text">{{ data_info.householderCardId }}</div>
        </div>
        <div class="item" v-if="data_info.householderRelationType">
          <div class="label">户主与儿童关系</div>
          <div class="text">
            {{ allEnum && allEnum.HouseRelationType.find(x => x.id === data_info.householderRelationType).value }}
          </div>
        </div>
      </div>
    </div>
    <!-- 监护人信息 -->
    <div class="confirm-box clearfix" v-if="data_info.guardianIsFill">
      <div class="subtitle">监护人信息</div>
      <div>
        <div class="item" v-if="data_info.guardianName">
          <div class="label">监护人姓名</div>
          <div class="text">{{ data_info.guardianName }}</div>
        </div>
        <div class="item" v-if="data_info.guardianCardId">
          <div class="label">监护人身份证号</div>
          <div class="text">{{ data_info.guardianCardId }}</div>
        </div>
        <div class="item" v-if="data_info.guardianTell">
          <div class="label">监护人联系方式</div>
          <div class="text">{{ data_info.guardianTell }}</div>
        </div>
        <div class="item" v-if="data_info.guardianRelationType">
          <div class="label">监护人与儿童关系</div>
          <div class="text">
            {{ allEnum && allEnum.HouseRelationType.find(x => x.id === data_info.guardianRelationType).value }}
          </div>
        </div>
        <div class="item" v-if="data_info.guardianRegisterAddress">
          <div class="label">监护人户籍地</div>
          <div class="text">{{ data_info.guardianRegisterAddress }}</div>
        </div>
      </div>
    </div>
    <!-- 不动产信息 -->
    <div class="confirm-box clearfix" v-if="data_info.houseIsFill">
      <div class="subtitle">不动产信息</div>
      <div>
        <div class="clearfix">
          <div class="item" v-if="data_info.houseStatus">
            <div class="label">产权情况</div>
            <div class="text">
              {{ allEnum && allEnum.HouseStatus.find(x => x.id === data_info.houseStatus).value }}
            </div>
          </div>
          <div class="item" v-if="data_info.houseRelationType">
            <div class="label">与儿童关系</div>
            <div class="text">
              {{ allEnum && allEnum.HouseRelationType.find(x => x.id === data_info.houseRelationType).value }}
            </div>
          </div>
          <div class="item" v-if="data_info.houseName">
            <div class="label">不动产所有人姓名</div>
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
            <div class="label">不动产所有人手机号</div>
            <div class="text">{{ data_info.houseRegisterTell }}</div>
          </div>
          <div class="item" v-if="data_info.houseAddress">
            <div class="label">不动产坐落地址</div>
            <div class="text">{{ data_info.houseAddress }}</div>
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
          <div class="item" v-if="data_info.houseProofBook">
            <div class="label">产权证明</div>
            <div class="file-item">
              <div class="img">
                <viewer>
                  <img :src="fileUrl + data_info.houseProofBook + '&filter=default'" alt />
                </viewer>
              </div>
            </div>
          </div>
          <div class="item" v-if="data_info.houseBook">
            <div class="label">房产证或不动产权证明</div>
            <div class="file-item">
              <div class="img">
                <viewer>
                  <img :src="fileUrl + data_info.houseBook + '&filter=default'" alt />
                </viewer>
              </div>
            </div>
          </div>
          <div class="item" v-if="data_info.houseAddressBook">
            <div class="label">不动产权证坐落地址页</div>
            <div class="file-item">
              <div class="img">
                <viewer>
                  <img :src="fileUrl + data_info.houseAddressBook + '&filter=default'" alt />
                </viewer>
              </div>
            </div>
          </div>
          <div class="item" v-if="data_info.houseMarryBook">
            <div class="label">监护人与配偶结婚证</div>
            <div class="file-item">
              <div class="img">
                <viewer>
                  <img :src="fileUrl + data_info.houseMarryBook + '&filter=default'" alt />
                </viewer>
              </div>
            </div>
          </div>
          <div
            class="item"
            v-if="data_info.loanContractBooks"
            v-for="item in data_info.loanContractBooks && data_info.loanContractBooks.split('|')"
            :key="item"
          >
            <div class="label">银行抵押贷款合同</div>
            <div class="file-item">
              <div class="img">
                <viewer>
                  <img :src="fileUrl + item" alt />
                </viewer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 企业信息 -->
    <div class="confirm-box clearfix" v-if="data_info.enterpriseIsFill">
      <div class="subtitle">企业信息</div>
      <div class="cearfix">
        <div class="item" v-if="data_info.enterpriseCompanyName">
          <div class="label">企业名称</div>
          <div class="text">{{ data_info.enterpriseCompanyName }}</div>
        </div>
        <div class="item" v-if="data_info.enterpriseRegisterNo">
          <div class="label">统一信用代码</div>
          <div class="text">{{ data_info.enterpriseRegisterNo }}</div>
        </div>
        <div class="item" v-if="data_info.enterprisePersonName">
          <div class="label">法人</div>
          <div class="text">{{ data_info.enterprisePersonName }}</div>
        </div>
        <div class="item" v-if="data_info.enterprisePersonCardId">
          <div class="label">法人身份证</div>
          <div class="text">{{ data_info.enterprisePersonCardId }}</div>
        </div>
      </div>
      <div class="clearfix">
        <div class="item" v-if="data_info.enterpriseBusinessLicenseBook">
          <div class="label">企业营业执照</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.enterpriseBusinessLicenseBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.enterpriseThresholdCertificateBook">
          <div class="label">企业起征点凭证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.enterpriseThresholdCertificateBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 单位信息 -->
    <div class="confirm-box clearfix" v-if="data_info.companyIsFill">
      <div class="subtitle">单位信息</div>
      <div class="clearfix">
        <div class="item" v-if="data_info.companyType">
          <div class="label">单位归属</div>
          <div class="text">
            {{ allEnum && allEnum.CompanyType.find(x => x.id === data_info.companyType).value }}
          </div>
        </div>
        <div class="item" v-if="data_info.companyName">
          <div class="label">单位名称</div>
          <div class="text">{{ data_info.companyName }}</div>
        </div>
        <div class="item" v-if="data_info.companyPersonName">
          <div class="label">单位法人</div>
          <div class="text">{{ data_info.companyPersonName }}</div>
        </div>
        <div class="item" v-if="data_info.companyUnifiedSocialCreditCode">
          <div class="label">单位统一社会信用代码</div>
          <div class="text">{{ data_info.companyUnifiedSocialCreditCode }}</div>
        </div>
        <div class="item" v-if="data_info.companyNameOfFather">
          <div class="label">父亲单位名称</div>
          <div class="text">{{ data_info.companyNameOfFather }}</div>
        </div>
        <div class="item" v-if="data_info.companyPersonNameOfFather">
          <div class="label">父亲单位法人</div>
          <div class="text">{{ data_info.companyPersonNameOfFather }}</div>
        </div>
        <div class="item" v-if="data_info.companyUnifiedSocialCreditCodeOfFather">
          <div class="label">父亲单位统一社会信用代码</div>
          <div class="text">
            {{ data_info.companyUnifiedSocialCreditCodeOfFather }}
          </div>
        </div>
        <div class="item" v-if="data_info.companyNameOfMother">
          <div class="label">母亲单位名称</div>
          <div class="text">{{ data_info.companyNameOfMother }}</div>
        </div>
        <div class="item" v-if="data_info.companyPersonNameOfMother">
          <div class="label">母亲单位法人</div>
          <div class="text">{{ data_info.companyPersonNameOfMother }}</div>
        </div>
        <div class="item" v-if="data_info.companyUnifiedSocialCreditCodeOfMother">
          <div class="label">母亲单位统一社会信用代码</div>
          <div class="text">
            {{ data_info.companyUnifiedSocialCreditCodeOfMother }}
          </div>
        </div>
      </div>
      <div class="clearfix">
        <div class="item" v-if="data_info.companyContractDeadlineBook">
          <div class="label">单位合同期限页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyContractDeadlineBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyContractSignBook">
          <div class="label">单位合同签字页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyContractSignBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyBusinessLicenseBook">
          <div class="label">单位营业执照</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyBusinessLicenseBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyThresholdCertificateBook">
          <div class="label">单位起征点凭证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyThresholdCertificateBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyContractDeadlineBookOfFather">
          <div class="label">父亲单位合同期限页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyContractDeadlineBookOfFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyContractSignBookOfFather">
          <div class="label">父亲单位合同签字页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyContractSignBookOfFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyBusinessLicenseBookOfFather">
          <div class="label">父亲单位营业执照</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyBusinessLicenseBookOfFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyThresholdCertificateBookOfFather">
          <div class="label">父亲单位起征点凭证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyThresholdCertificateBookOfFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyContractDeadlineBookOfMother">
          <div class="label">母亲单位合同期限页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyContractDeadlineBookOfMother + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyContractSignBookOfMother">
          <div class="label">母亲单位合同签字页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyContractSignBookOfMother + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyBusinessLicenseBookOfMother">
          <div class="label">母亲单位营业执照</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyBusinessLicenseBookOfMother + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.companyThresholdCertificateBookOfMother">
          <div class="label">母亲单位起征点凭证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.companyThresholdCertificateBookOfMother + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 附件信息 -->
    <div class="confirm-box clearfix" v-if="data_info.bookIsFill">
      <div class="subtitle">附件信息</div>
      <div>
        <div class="item" v-if="data_info.schoolHouseholdBookHome">
          <div class="label">学区房户口本-首页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.schoolHouseholdBookHome + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.nmsParentsHouseholdBookHome">
          <div class="label">户口本南明山父母信息页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.nmsParentsHouseholdBookHome + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.schoolHouseholdBookOneself">
          <div class="label">学区房户口本-本人页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.schoolHouseholdBookOneself + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookHome">
          <div class="label">儿童户口本-首页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookHome + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookParents">
          <div class="label">儿童户口本-父母信息页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookParents + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookFather">
          <div class="label">儿童户口本-父亲信息页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookMother">
          <div class="label">儿童户口本-母亲信息页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookMother + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.childrenHouseholdBookOneself">
          <div class="label">儿童户口本-本人页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.childrenHouseholdBookOneself + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.marriageCertificateBook">
          <div class="label">结婚证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.marriageCertificateBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.passportPicOfChild">
          <div class="label">儿童护照</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.passportPicOfChild + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.passportPicOfFather">
          <div class="label">父亲护照</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.passportPicOfFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.passportPicOfMother">
          <div class="label">母亲护照</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.passportPicOfMother + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.overseasChineseCertificatePicOfFather">
          <div class="label">父亲华侨证明</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.overseasChineseCertificatePicOfFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.overseasChineseCertificatePicOfMather">
          <div class="label">母亲华侨证明</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.overseasChineseCertificatePicOfMather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.residencePermitBook">
          <div class="label">居住证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.residencePermitBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.residencePermitBookFather">
          <div class="label">父亲居住证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.residencePermitBookFather + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.residencePermitBookMother">
          <div class="label">母亲居住证</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.residencePermitBookMother + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.certificateOfRelevantUnitsBook">
          <div class="label">相关单位证明</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.certificateOfRelevantUnitsBook + '&filter=default'" alt />
              </viewer>
            </div>
          </div>
        </div>
        <div class="item" v-if="data_info.bothParentsAddressBookSelfAnyOne">
          <div class="label">父母一方户籍在城区的户口本本人页</div>
          <div class="file-item">
            <div class="img">
              <viewer>
                <img :src="fileUrl + data_info.bothParentsAddressBookSelfAnyOne + '&filter=default'" alt />
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
      </div>
    </div>
    <!-- 志愿学校 -->
    <div class="confirm-box clearfix" v-if="data_info.schoolIsFill">
      <div class="subtitle">志愿学校</div>
      <div>
        <div class="item" v-if="data_info.schoolInfoId">
          <div class="label">志愿学校</div>
          <div class="text">{{ data_info.schoolName }}</div>
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
