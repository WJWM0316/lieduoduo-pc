<template>
  <div class="post-job">
    <el-form class="edit-form" ref="form" :model="form" :rules="rules" label-width="120px" label-suffix="：">
      <h3 class="title">职位基本信息</h3>
      <p class="hint">加“ <span style="color: red; font-size: 15px;">*</span> ”内容，在确认发布成功后，将无法修改</p>

      <el-form-item label="职位名称" prop="position_name" style="width: 450px;">
        <el-input v-model="form.position_name" :disabled="isEdit" placeholder="限制50个字以内" :maxlength="50" style="width: 382px;"></el-input>
      </el-form-item>

      <el-form-item label="职位类别" prop="type" style="width: 450px;">
        <!-- <el-select :disabled="isEdit" v-model="selectPositionItem.name" placeholder="点击选择职位类别"  style="width: 382px;">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <select-position-type
          style="width: 382px;"
          v-model.number="form.type"
          :disabled="isEdit"
          :label="form.positionTypeName"
          @on-selected="selectedPosition">
        </select-position-type>
      </el-form-item>

      <el-form-item label="工作地点" prop="address_id" style="width: 450px;">
        <el-select v-model="form.address_id" placeholder="点击选择工作地点" @change="changeAdress" style="width: 382px;">
          <el-option
            v-for="item in addressList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 382px;">
            <div class="address_line textEllipsis"  v-if="item.value!=='0'">
              {{ item.label }}
            </div>
            <div class="address_line cur textEllipsis" v-else>
              <i class="iconfont icon-tianjia add_icon"></i>
              <span>{{ item.label }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>

      <h3 class="title second">职位要求</h3>
      <p class="hint">我们将通过以下条件，为您精确推荐合适的求职者，请尽量详细填写</p>

      <el-form-item label="经验要求" prop="work_experience" style="width: 450px;">
        <el-select v-model="form.work_experience" placeholder="请选择经验要求"  style="width: 382px;">
          <el-option
            v-for="item in experienceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="最低学历" prop="education" style="width: 450px;">
        <el-select v-model="form.education" placeholder="请选择学历要求"  style="width: 382px;">
          <el-option
            v-for="item in educationList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="emolument" label="薪酬范围" prop="emolument_min" style="width: 450px;">
        <div class="emolument_cont" style="width: 382px;">
          <el-select v-model="form.emolument_min" placeholder="薪资范围" @change="changeEmolumentMin"  style="width: 120px;">
            <el-option
              v-for="item in emolumentMinList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="emolument_line">-</span>
          <el-select v-model="form.emolument_max" placeholder="薪资范围"  style="width: 120px;">
            <el-option
              v-for="item in emolumentMaxList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="emolument_line">-</span>
          <el-select v-model.number="form.annual_salary" placeholder="年薪"  style="width: 120px;">
            <el-option
              v-for="item in annualSalaryLists"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item label="技能要求" prop="skill_tag" style="width: 450px;">
        <el-select
          style="width: 382px;"
          v-model="form.labels"
          multiple
          :multiple-limit="4"
          filterable
          placeholder="请选择技能要求">
          <el-option
            v-for="item in currentLabels"
            :key="item.labelId"
            :label="item.name"
            :value="item.labelId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职位描述" prop="describe" style="width: 520px;" >
        <el-input
          type="textarea"
          :autosize="{ minRows: 6}"
          placeholder="请填写职位描述"
          :maxlength="5000"
          v-model="form.describe"
          style="width: 520px;"
         ></el-input>
      </el-form-item>

      <p class="ruleHint">发布职位即表示同意遵守<span @click="toIssueRule">《猎多多职位信息发布规则》</span>，如违反将导致您的账号被锁定</p>

      <div class="btn-container">
        <el-button class="btn_submit" type="primary" @click="handleSubmit">发布</el-button>
        <el-button class="btn_cancel" @click="handleCancel">取消</el-button>

        <div class="cloJob" v-if="isEdit && isOnline" @click="cloJob">关闭该职位</div>
      </div>

      <div class="pop" v-if="pop.isShow">
        <map-search v-if="pop.type==='addAdress'" @popCancel="popCancel" @addAdress="addAdress"></map-search>
        <div class="addAdressPop" v-if="pop.type==='addAdress2'">
          <img class="clo" src="../../assets/images/clo.png" @click="popCancel" />
          <h3 class="">添加新的公司地址</h3>
          <p>你创建的工作地址，将加入公司的地址库中与同事共享</p>

          <el-input style="width: 368px;margin: 13px 0 26px 0;box-sizing: border-box;" v-model="adressInput" placeholder="请输入工作地址）"></el-input>

          <el-input style="width: 368px;margin: 13px 0 26px 0;box-sizing: border-box;" v-model="adress_id_Input" placeholder="请输入门牌号（选填）"></el-input>

          <div class="btn-add">
            <el-button class="btn_cancel" @click="popCancel">取消</el-button>
            <el-button class="btn_submit" type="primary" @click="addAdress">添加</el-button>
          </div>
        </div>
      </div>

    </el-form>
  </div>
</template>

<script>
import PostJob from './postJob'
export default PostJob
</script>

<style lang="scss" scoped>
@import "./postJob.scss";

</style>
