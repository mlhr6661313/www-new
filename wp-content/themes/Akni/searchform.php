<?php /*
<a class="icon-search" href="#">search</a>
*/ ?>
<div class="search-field">
	<form method="get" id="searchform" autocomplete="off" action="<?php echo esc_url( home_url( '/' ) ); ?>">
		<input type="text" class="field" name="s" id="s" maxlength="50" placeholder="<?php echo customTranslate('<!--:ru-->Поиск<!--:--><!--:ua-->Пошук<!--:-->')?>" />
		<div class="search-right">
			<input id="search_submit" type="submit" class="sim" name="submit"  value="<?php echo customTranslate('<!--:ru-->Поиск<!--:--><!--:ua-->Пошук<!--:-->')?>" />
			<?php /*
			<label for="search_submit"></label>
			*/ ?>
		</div>
	</form>
	<?php /*
	<div class="close-btn"></div>
	*/ ?>
</div>