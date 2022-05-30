<?php
// print_r($_POST);
if ( !empty( $_FILES ) ) {

    foreach($_FILES as $file) {
      print_r($file);
      $tempPath = $file['tmp_name'];
      $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $file['name'];
      echo '<br>' . $uploadPath . '<br><br>';
      move_uploaded_file( $tempPath, $uploadPath );

      $answer = array( 'answer' => 'File transfer completed' );
      $json = json_encode( $answer );
    }


    echo $json;

} else {

    echo 'No files';

}

?>
