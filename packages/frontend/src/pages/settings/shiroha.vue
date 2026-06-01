<!--
SPDX-FileCopyrightText: syuilo and misskey-project & noridev and cherrypick-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<SearchMarker path="/settings/shiroha" label="Shiroha" :keywords="['shiroha']" icon="ti ti-settings">
	<div class="_gaps_m">
		<FormSection first>
			<template #label><SearchLabel>Shiroha独自機能の設定</SearchLabel></template>
			<div class="_gaps_s">
				<SearchMarker :keywords="['search', 'mfc', 'mfm', 'misskey']">
					<MkSwitch v-model="useSearchConversionSyntax">
						<template #label><SearchLabel>検索MFCをMisskey互換で表示</SearchLabel> <span class="_beta">Shiroha</span></template>
					</MkSwitch>
				</SearchMarker>

				<SearchMarker :keywords="['post', 'form', 'classic', 'misskey', 'size']">
					<MkSwitch v-model="useClassicPostForm">
						<template #label><SearchLabel>投稿フォームのサイズをMisskey仕様にする</SearchLabel> <span class="_beta">Shiroha</span></template>
					</MkSwitch>
				</SearchMarker>

				<SearchMarker :keywords="['post', 'form', 'attach', 'file', 'upload', 'drive', 'menu']">
					<MkSwitch v-model="useClassicFileAttachMenu">
						<template #label><SearchLabel>ファイル添付ボタンをメニューにまとめる</SearchLabel> <span class="_beta">Shiroha</span></template>
					</MkSwitch>
				</SearchMarker>

				<SearchMarker :keywords="['note', 'visibility', 'color', 'background']">
					<MkSwitch v-model="coloredNoteByVisibility">
						<template #label><SearchLabel>公開範囲に応じてノートの背景を色付け</SearchLabel> <span class="_beta">Shiroha</span></template>
						<template #caption><SearchText>ホーム・フォロワー・ダイレクトの投稿を、設定した色で薄く着色します。</SearchText></template>
					</MkSwitch>
				</SearchMarker>

				<template v-if="coloredNoteByVisibility">
					<MkColorInput v-model="visibilityColorHome">
						<template #label>ホーム</template>
					</MkColorInput>
					<MkColorInput v-model="visibilityColorFollowers">
						<template #label>フォロワー</template>
					</MkColorInput>
					<MkColorInput v-model="visibilityColorSpecified">
						<template #label>ダイレクト</template>
					</MkColorInput>
				</template>
			</div>
		</FormSection>
	</div>
</SearchMarker>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import MkSwitch from '@/components/MkSwitch.vue';
import MkColorInput from '@/components/MkColorInput.vue';
import FormSection from '@/components/form/section.vue';
import { store } from '@/store.js';
import { globalEvents } from '@/events.js';
import { definePage } from '@/page.js';
import { suggestReload } from '@/utility/reload-suggest.js';

const useSearchConversionSyntax = computed(store.makeGetterSetter('useSearchConversionSyntax'));
const useClassicPostForm = computed(store.makeGetterSetter('useClassicPostForm'));
const useClassicFileAttachMenu = computed(store.makeGetterSetter('useClassicFileAttachMenu'));
const coloredNoteByVisibility = computed(store.makeGetterSetter('coloredNoteByVisibility'));
const visibilityColorHome = computed(store.makeGetterSetter('visibilityColorHome'));
const visibilityColorFollowers = computed(store.makeGetterSetter('visibilityColorFollowers'));
const visibilityColorSpecified = computed(store.makeGetterSetter('visibilityColorSpecified'));

// 投稿フォームの仕様変更は再読み込みが必要なためリロードを促す
watch(useClassicPostForm, () => {
	suggestReload();
});

// 検索表示の切り替えはタイムラインの再読み込みで即時反映する
watch(useSearchConversionSyntax, () => {
	globalEvents.emit('reloadTimeline');
});

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePage(() => ({
	title: 'Shiroha',
	icon: 'ti ti-settings',
}));
</script>
