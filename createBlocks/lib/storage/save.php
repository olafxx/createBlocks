 <?
  $str = str_replace("\\\"", "\"", $data);
  
  $url = "../../../projects/".$projectName."/storage/".$file;
 
  $fo = fopen ($url,"w");
   
  if ( !$fo )
  {
    echo("������ �������� �����");
  }
  else
  {
     fputs ($fo, $str);
	  echo "ok";
 
  }
  fclose ($fo);
  
    //echo $url; 

?>