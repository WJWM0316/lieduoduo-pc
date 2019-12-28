<template>
	<div id="interview">
    <FloatBox />
    <Siderbar />
    <AdsorptionBar />
	</div>
</template>
<script>
import Siderbar from './components/siderbar'
import FloatBox from './components/content'
import AdsorptionBar from './components/adsorptionBar'
import DialogModel from './components/dialog'

export default {
	components: {
		Siderbar,
		FloatBox,
		AdsorptionBar,
		DialogModel
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
