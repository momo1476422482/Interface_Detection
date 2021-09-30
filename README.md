# Interface_Detection

Pour démarrer l'application : 
1) Il faut ouvrir deux terminals :
  Go to dossier /app : npm i et puis npm run start
  Go to dossier /server : npm i et puis npm run start
  
2) Télécharger le code de l'algo de détection (Efficientdet) d'après https://github.com/zylo117/Yet-Another-EfficientDet-Pytorch.git
    et puis installer python 3.6 et toutes les librairies nécessaires demandés dans requirement.txt
    !!! Il faut faire l'attention à l'installation de torch : il faut utiliser ligne de commande suivante:
pip install torch==1.9.1+cu102 torchvision==0.10.1+cu102 torchaudio===0.9.1 -f https://download.pytorch.org/whl/torch_stable.html
     
     
     
4) Sur le fichier efficient_test.py : 
   Il faut utiliser le fichier efficientdet_test.py de ce répertoire (télécharger et puis mettre dans local)

   img_path = 'C:/Users/mzhang/Interface_Detection/server/uploads/' + file_name
   Il faut remplacer ce img_path par ton propre chemin d'accès
   
   Il faut télécharger et mettre effcientdet-d0.pth dans local




