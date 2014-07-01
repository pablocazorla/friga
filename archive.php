<?php
$category_id = get_cat_ID('Portfolio');

	if (in_category($category_id )|| post_is_in_descendant_category($category_id )) {
		include(TEMPLATEPATH . '/archivework.php');
	} else {
		include(TEMPLATEPATH . '/archiveblog.php');
	}
?>