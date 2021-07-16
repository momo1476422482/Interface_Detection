import cv2
import matplotlib.pyplot as plt
image = cv2.imread("test.jpg",1)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
plt.imshow(image)
plt.show()
