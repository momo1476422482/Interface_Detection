import sys
import cv2
import matplotlib.pyplot as plt
import os.path


filePath = sys.argv[1]

if os.path.exists(filePath) :
    image = cv2.imread(filePath,1)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    plt.imshow(image)
    plt.show()
