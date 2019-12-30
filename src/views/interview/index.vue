<template>
	<div id="interview">
	  <interview-content />
    <interview-sider-bar />
    <floating-bar />
	</div>
</template>
<script>
import InterviewSiderBar from './components/siderbar'
import InterviewContent from './components/content'
import FloatingBar from 'COMPONENTS/floatingBar'
export default {
	components: {
		InterviewSiderBar,
		InterviewContent,
		FloatingBar
	}
}
</script>
<style lang="scss" scoped>
#interview{
	width: $page-width;
	margin: 30px auto;
	display: flex;
}
</style>
