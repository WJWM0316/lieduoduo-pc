<template>
	<div id="interview">
	  <interview-content />
    <interview-sider-bar />
	</div>
</template>
<script>
import InterviewSiderBar from './components/siderbar'
import InterviewContent from './components/content'
export default {
	components: {
		InterviewSiderBar,
		InterviewContent
	}
}
</script>
<style lang="scss" scoped>
#interview{
	width: $page-width;
	margin: 30px auto 0 auto;
	display: flex;
}
</style>
