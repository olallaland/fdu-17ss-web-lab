<?php

function generateLink($url, $label, $class) {
   $link = '<a href="' . $url . '" class="' . $class . '">';
   $link .= $label;
   $link .= '</a>';
   return $link;
}


function outputPostRow($number)  {
    include("travel-data.inc.php");
	$row = '<div class="row">';
	$row .= '<div class="col-md-4">';
	$row .= '<a href="post.php?id='.${'postId'.$number}.'" class=""><img src="images/'.${'thumb'.$number}.'" alt="'.${'title'.$number}.'" class="img-responsive"/></a></div>';
	$row .= '<div class="col-md-8">';
	$row .= '<h2>'.${'title'.$number}.'</h2>';
	$row .= '<div class="details">Posted by ';
	$row .= generateLink('user.php?id='.${'userId'.$number}.'', ''.${'userName'.$number}.'', "");
	$row .= '<span class="pull-right">'.${'date'.$number}.'</span>';
	$row .= '<p class="ratings">';
	$row .= constructRating(${'reviewsRating'.$number});
	$row .= ' '.${'reviewsNum'.$number}.' REVIEWS</p></div>';
	$row .= '<p class="excerpt">'.${'excerpt'.$number}.'</p>';
	$row .= '<p><a href="post.php?id='.${'postId'.$number}.'" class="btn btn-primary btn-sm">Read more</a></p></div></div><hr/>';
	echo $row;
}

/*
  Function constructs a string containing the <img> tags necessary to display
  star images that reflect a rating out of 5
*/
function constructRating($rating) {
    $imgTags = "";
    
    // first output the gold stars
    for ($i=0; $i < $rating; $i++) {
        $imgTags .= '<img src="images/star-gold.svg" width="16" /> ';
    }
    
    // then fill remainder with white stars
    for ($i=$rating; $i < 5; $i++) {
        $imgTags .= '<img src="images/star-white.svg" width="16" /> ';
    }    
    
    return $imgTags;    
}

?>