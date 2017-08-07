/*
Navicat MySQL Data Transfer

Source Server         : bendi
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : live

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-05-17 13:40:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for live_admin
-- ----------------------------
DROP TABLE IF EXISTS `live_admin`;
CREATE TABLE `live_admin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) NOT NULL,
  `upwd` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_admin
-- ----------------------------
INSERT INTO `live_admin` VALUES ('1', 'admin', '3da6cf345f8717d64c8ae3efd2a15c58');

-- ----------------------------
-- Table structure for live_banner
-- ----------------------------
DROP TABLE IF EXISTS `live_banner`;
CREATE TABLE `live_banner` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `banner` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_banner
-- ----------------------------
INSERT INTO `live_banner` VALUES ('1', '/uploads/20170516/39cf72601987c547f10b87ddafc8d077.jpg', '');
INSERT INTO `live_banner` VALUES ('4', '/uploads/20170516/91ba2a7e4b014e1ec0fc3f951b09576f.gif', 'http://www.baidu.com');
INSERT INTO `live_banner` VALUES ('5', '/uploads/20170516/47f0f5f7e6c1cb188024a78d005fdf4c.jpg', 'http://www.baidu.com');

-- ----------------------------
-- Table structure for live_blacklist
-- ----------------------------
DROP TABLE IF EXISTS `live_blacklist`;
CREATE TABLE `live_blacklist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `ip` varchar(100) NOT NULL,
  `area` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_blacklist
-- ----------------------------
INSERT INTO `live_blacklist` VALUES ('5', '180.162.201.107', '上海&nbsp;上海');
INSERT INTO `live_blacklist` VALUES ('8', '139.196.175.22', '上海&nbsp;上海');

-- ----------------------------
-- Table structure for live_chatcontent
-- ----------------------------
DROP TABLE IF EXISTS `live_chatcontent`;
CREATE TABLE `live_chatcontent` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `chatname` varchar(255) NOT NULL,
  `chatmessage` mediumtext NOT NULL,
  `chatlevel` tinyint(2) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `time` varchar(100) NOT NULL,
  `uid` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=468 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_chatcontent
-- ----------------------------
INSERT INTO `live_chatcontent` VALUES ('460', '系统消息', '%u5E73%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22pingcang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915658', '0');
INSERT INTO `live_chatcontent` VALUES ('436', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915238', '0');
INSERT INTO `live_chatcontent` VALUES ('437', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915240', '0');
INSERT INTO `live_chatcontent` VALUES ('438', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915244', '0');
INSERT INTO `live_chatcontent` VALUES ('439', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915246', '0');
INSERT INTO `live_chatcontent` VALUES ('440', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915252', '0');
INSERT INTO `live_chatcontent` VALUES ('441', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915254', '0');
INSERT INTO `live_chatcontent` VALUES ('442', '哎呀妈呀', '%3Cimg%20src%3D%27/room/images/face/lxhlonely_thumb.gif%27%20alt%3D%27lxh%u6CA1%u4EBA%u75BC%27%3E%3Cimg%20src%3D%27/room/images/face/lxhxiangyixiang_thumb.gif%27%20alt%3D%27lxh%u60F3%u4E00%u60F3%27%3E%3Cimg%20src%3D%27/room/images/face/lxhpubuhan_thumb.gif%27%20alt%3D%27lxh%u7011%u5E03%u6C57%27%3E%3Cimg%20src%3D%27/room/images/face/lxhwahaha_thumb.gif%27%20alt%3D%27lxh%u7B11%u54C8%u54C8%27%3E%3Cimg%20src%3D%27/room/images/face/lxhshuaishuaishou_thumb.gif%27%20alt%3D%27lxh%u7529%u7529%u624B%27%3E%3Cimg%20src%3D%27/room/images/face/lxhbeidian_thumb.gif%27%20alt%3D%27lxh%u88AB%u7535%27%3E%3Cimg%20src%3D%27/room/images/face/lxhxuyuan_thumb.gif%27%20alt%3D%27lxh%u8BB8%u613F%27%3E%3Cimg%20src%3D%27/room/images/face/lxhblowakiss_thumb.gif%27%20alt%3D%27lxh%u4EB2%u4E00%u53E3%27%3E%3Cimg%20src%3D%27/room/images/face/lxhzan_thumb.gif%27%20alt%3D%27lxh%u8D5E%27%3E%3Cimg%20src%3D%27/room/images/face/lxhzan_thumb.gif%27%20alt%3D%27lxh%u8D5E%27%3E%3Cimg%20src%3D%27/room/images/face/lxhzan_thumb.gif%27%20alt%3D%27lxh%u8D5E%27%3E%3Cimg%20src%3D%27/uploads/20170516/2b379fd7c607d9958c7adaf0b9a8de41.png%27%20width%3D%27100px%27%20height%3D%27100px%27%20onclick%3D%27large%28this%29%27%3E', '7', '1', '1494915298', '53');
INSERT INTO `live_chatcontent` VALUES ('443', '哎呀妈呀', '%u8303%u5FB7%u8428%u8303%u5FB7%u8428fds%20fds%20f%u5927%u795Ef%u7B2C%u4E09%u65B9f%u6C34%u7535%u8D39%u5927%u795Ef%u7B2C%u4E09%u65B9%u6C34%u7535%u8D39%u53D1%u7684%u8001%u89C4%u77E9', '7', '1', '1494915314', '53');
INSERT INTO `live_chatcontent` VALUES ('444', '哎呀妈呀', '%u51CF%u80A5%u901F%u5EA6%u5FEB%u89E3%u653E%u6263%u6C34%u7535%u8D39%u6C34%u7535%u8D39%u770B%u7535%u89C6%u6765%u5206%u89E3%u4E3A%u7532%u65B9%u4ED8%u91D1%u989D%u4E3A%u5F00%u53D1%u79D1%u6211%u670D%u4F60%u75AF%u72C2%u5A01%u950B%u7F51%u5BA2%u670D%u80FD%u4E3A%u7A7A%u5357%u65B9new%u5BA2%u670D%u5462%u6211%u770B%u8303%u56F4%u770B%u6C1B%u56F4%u4F60%u5206%u5F00%u5357%u65B9%u7F51%u53EF%u4F60%u5206%u5F00%u7FC1%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u4E8C%u5C3E%u77FF%u5E93%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u6269%u4ED8', '7', '1', '1494915326', '53');
INSERT INTO `live_chatcontent` VALUES ('445', '哎呀妈呀', '%u6606%u4ED1%u51B3%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%u6253%u7B97%u7684%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%u7684%u6492%u591A', '7', '1', '1494915349', '53');
INSERT INTO `live_chatcontent` VALUES ('446', '哎呀妈呀', '%u63D2%u4E0A%u7684%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%u5927%u795E', '7', '1', '1494915361', '53');
INSERT INTO `live_chatcontent` VALUES ('447', '哎呀妈呀', '%u5927%u5927%u795E%u5927%u795E%u5927%u795E%u5927%u795E', '7', '1', '1494915392', '53');
INSERT INTO `live_chatcontent` VALUES ('448', '哎呀妈呀', '%u5927%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%20%26nbsp%3B%26nbsp%3B%u5927%u795E%u5927%u795E%u5927%u795E%u5927%u795E', '7', '1', '1494915400', '53');
INSERT INTO `live_chatcontent` VALUES ('449', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915522', '0');
INSERT INTO `live_chatcontent` VALUES ('450', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915526', '0');
INSERT INTO `live_chatcontent` VALUES ('451', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915528', '0');
INSERT INTO `live_chatcontent` VALUES ('452', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915531', '0');
INSERT INTO `live_chatcontent` VALUES ('453', '系统消息', '%u5E73%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22pingcang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915538', '0');
INSERT INTO `live_chatcontent` VALUES ('454', '系统消息', '%u5E73%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22pingcang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915542', '0');
INSERT INTO `live_chatcontent` VALUES ('455', '系统消息', '%u5E73%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22pingcang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915546', '0');
INSERT INTO `live_chatcontent` VALUES ('456', '系统消息', '%u5E73%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22pingcang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915551', '0');
INSERT INTO `live_chatcontent` VALUES ('457', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915628', '0');
INSERT INTO `live_chatcontent` VALUES ('458', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915642', '0');
INSERT INTO `live_chatcontent` VALUES ('459', '系统消息', '%u5E73%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22pingcang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494915654', '0');
INSERT INTO `live_chatcontent` VALUES ('461', '哼哼', '%u554A', '7', '1', '1494915801', '0');
INSERT INTO `live_chatcontent` VALUES ('462', '哼', '%u554A%u554A', '8', '1', '1494915803', '0');
INSERT INTO `live_chatcontent` VALUES ('463', '哎呀妈呀', 'a', '6', '0', '1494923057', '53');
INSERT INTO `live_chatcontent` VALUES ('464', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494999409', '0');
INSERT INTO `live_chatcontent` VALUES ('465', '系统消息', '%u5EFA%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22jiancang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494999418', '0');
INSERT INTO `live_chatcontent` VALUES ('466', '系统消息', '%u5E73%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22pingcang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494999428', '0');
INSERT INTO `live_chatcontent` VALUES ('467', '系统消息', '%u5E73%u4ED3%uFF1A%u751F%u7269%u71C3%u6599200%u4E07%u7ACB%u65B9%20%20%3Ci%20href%3D%22javascript%3Avoid%280%29%22%20onclick%3D%22pingcang%28%29%22%20style%3D%22color%3Agreen%3B%22%3E%u70B9%u51FB%u67E5%u770B%3C/i%3E', '8', '1', '1494999437', '0');

-- ----------------------------
-- Table structure for live_countdown
-- ----------------------------
DROP TABLE IF EXISTS `live_countdown`;
CREATE TABLE `live_countdown` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `watch_time` varchar(255) NOT NULL,
  `watch_ip` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_countdown
-- ----------------------------

-- ----------------------------
-- Table structure for live_course
-- ----------------------------
DROP TABLE IF EXISTS `live_course`;
CREATE TABLE `live_course` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `time` varchar(100) NOT NULL,
  `day1` varchar(100) NOT NULL,
  `day2` varchar(100) NOT NULL,
  `day3` varchar(100) NOT NULL,
  `day4` varchar(100) NOT NULL,
  `day5` varchar(100) NOT NULL,
  `day6` varchar(100) NOT NULL,
  `day7` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_course
-- ----------------------------
INSERT INTO `live_course` VALUES ('1', '9:00-10:30', '何老师', '艾老师', '田老师', '李老师', '李老师', '', '');
INSERT INTO `live_course` VALUES ('2', '10:30-12:00', '吴老师', '何老师', '艾老师', '田老师', '吴老师', '', '');
INSERT INTO `live_course` VALUES ('3', '12:00-13:30', '艾老师', '晓晓老师', '田老师', '田老师', '谢老师', '', '');
INSERT INTO `live_course` VALUES ('4', '13:30-15:00', '晓晓老师', '艾老师', '何老师', '李老师', '吴老师', '', '');
INSERT INTO `live_course` VALUES ('5', '15:00-16:30', '吴老师', '晓晓老师', '李老师', '田老师', '谢老师', '', '');
INSERT INTO `live_course` VALUES ('6', '16:30-18:00', '晓晓老师', '艾老师', '艾老师', '谢老师', '吴老师', '', '');
INSERT INTO `live_course` VALUES ('7', '18:00-19:00', '晓晓老师', '晓晓老师', '何老师', '谢老师', '谢老师', '', '');
INSERT INTO `live_course` VALUES ('8', '19:00-20:30', '艾老师', '何老师', '李老师', '田老师', '谢老师', '', '');
INSERT INTO `live_course` VALUES ('9', '20:30-22:00', '晓晓老师', '李老师', '何老师', '谢老师', '谢老师', '', '');
INSERT INTO `live_course` VALUES ('10', '22:00-23:30', '吴老师', '艾老师', '李老师', '吴老师', '谢老师', '', '');
INSERT INTO `live_course` VALUES ('11', '23:30-01:00', '晓晓老师', '李老师', '李老师', '谢老师', '谢老师', '', '');

-- ----------------------------
-- Table structure for live_forecast
-- ----------------------------
DROP TABLE IF EXISTS `live_forecast`;
CREATE TABLE `live_forecast` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `download` varchar(255) NOT NULL,
  `time` varchar(50) NOT NULL,
  `user` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_forecast
-- ----------------------------
INSERT INTO `live_forecast` VALUES ('16', ' 战神老师~2017.5.11天然气EIA布局+数据精准预埋(4)', '', '', '1494575175', ' 战神老师');

-- ----------------------------
-- Table structure for live_goods
-- ----------------------------
DROP TABLE IF EXISTS `live_goods`;
CREATE TABLE `live_goods` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_goods
-- ----------------------------
INSERT INTO `live_goods` VALUES ('1', '生物燃料200万立方');
INSERT INTO `live_goods` VALUES ('2', '青西咖啡20吨');
INSERT INTO `live_goods` VALUES ('3', '青西铜5吨');
INSERT INTO `live_goods` VALUES ('4', '青西活牛50吨');
INSERT INTO `live_goods` VALUES ('5', '辽贵银100千克');
INSERT INTO `live_goods` VALUES ('6', '铂金1000克');
INSERT INTO `live_goods` VALUES ('7', '钯金1000克');
INSERT INTO `live_goods` VALUES ('8', '工业银板100千克');
INSERT INTO `live_goods` VALUES ('9', '工业沥青100吨');
INSERT INTO `live_goods` VALUES ('10', '电解铜50吨');

-- ----------------------------
-- Table structure for live_jiancang
-- ----------------------------
DROP TABLE IF EXISTS `live_jiancang`;
CREATE TABLE `live_jiancang` (
  `jiancang_id` int(10) NOT NULL AUTO_INCREMENT,
  `time` varchar(50) NOT NULL,
  `jianyi` varchar(100) NOT NULL,
  `cangwei` varchar(40) NOT NULL,
  `goods_id` int(10) NOT NULL,
  `cangjia` varchar(40) NOT NULL,
  `sunjia` varchar(40) NOT NULL,
  `yingjia` varchar(40) NOT NULL,
  `pingcang` varchar(40) NOT NULL,
  `type` varchar(40) NOT NULL,
  `teacher_id` int(10) NOT NULL,
  `is_pingcang` tinyint(1) NOT NULL,
  PRIMARY KEY (`jiancang_id`)
) ENGINE=MyISAM AUTO_INCREMENT=255 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_jiancang
-- ----------------------------
INSERT INTO `live_jiancang` VALUES ('251', '1494915657', '现价买入', '', '1', '', '', '', '', '麦上单', '53', '1');
INSERT INTO `live_jiancang` VALUES ('252', '1494915654', '现价买入', '', '1', '', '', '', '', '麦上单', '53', '1');
INSERT INTO `live_jiancang` VALUES ('253', '1494999436', '现价买入', '', '1', '', '', '', '', '麦上单', '32', '1');
INSERT INTO `live_jiancang` VALUES ('254', '1494999428', '现价买入', '', '1', '', '', '', '', '麦上单', '32', '1');
INSERT INTO `live_jiancang` VALUES ('250', '1494915538', '现价买入', '', '1', '', '', '', '', '麦上单', '53', '1');

-- ----------------------------
-- Table structure for live_jiangshi
-- ----------------------------
DROP TABLE IF EXISTS `live_jiangshi`;
CREATE TABLE `live_jiangshi` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `style` varchar(100) NOT NULL,
  `history` varchar(100) NOT NULL,
  `index` varchar(100) NOT NULL,
  `recommend` text NOT NULL,
  `flag` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_jiangshi
-- ----------------------------
INSERT INTO `live_jiangshi` VALUES ('1', ' 首席风云老师', '/room/images/js1.png', '快、狠、准，果断，稳健', ' 2005年至今（12年以上）', '追踪布林,MACD,裸K形态', '风云老师早年在美国进修金融理论课程，曾在纽约证券交易所任职，并在美国纽约证券市场进行多年实战操盘，具有丰富的实操经验。后因2010年国内现货市场兴起，转战回归，致力于有色金属及原油现货市场的分析和实战操盘。独家自创AI交易系统《风云看势》，高级技术《赢战天下》，人称常胜将军、预言帝、数据王，非农、EIA等大数据可快速带领大家资金翻倍。以分析精准，获利迅速，见解独到为投资者所认同。', '风云看势');
INSERT INTO `live_jiangshi` VALUES ('2', ' 诸葛老师', '/room/images/js1.png', ' 短线能手、沉稳、果断、数据杀手', '2005年至今（12年以上）', '布林带,KDJ,MA,CCI,K形态', '诸葛老师毕业于西南财经大学，先后师从多位名师学习投资理论，曾与李彪论禅。通过对鳄鱼理论、MACD、布林带、裸K等理论，经历多年的市场实践，与潜心研究，总结创立了《天威战法》、《狂龙三势》、《逍遥掌法》、《理性交易心法》、《K线独门秘籍》等多种独门投资技学，对股票与现货市场有独到的见解和实战能力。\r\n先后担任广发基金经理、私募投资总监、光大证券高级分析师、西南财经大学研究生导师客座教授，曾经被国内多家投资邀请做投资演讲报告，桃李满天下。擅长把握趋势、思路敏捷、操作严谨，有独到的空间理论和钟摆理论分析。', '绝杀系统');
INSERT INTO `live_jiangshi` VALUES ('3', '战神老师', '/room/images/js1.png', '短线能手、沉稳、果断、数据杀手', '2007年至今（10年以上）', '裸K,MACD,均线系统,趋势定位', '战神老师毕业于西南财经大学，早年曾在英大证券交易所工作，具有丰富的股市经验，曾与李大霄先生谈股论金，独创《选股秘籍》。后在2011年被天交所高薪聘请，职位首席策略分析师，一直研究至今。具备丰富的实战交易经历和技术分析经验。坚持用客观的角度去分析当下的行情，总结得出了《四合一交易系统》、《周期共振交易系统》，尤其擅长对数据走势分析与行情预判，成功率高达85%以上，深受广大投资者好评。', '趋势定位');
INSERT INTO `live_jiangshi` VALUES ('4', '星怡老师', '/room/images/js2.png', '稳健、果断、干脆利落', '1997年至今（20年以上）', '量价时筹,MACD,王牌抄底形态,裸K技术', '星怡老师毕业于著名的新加坡金融管理学院。1998年回国参与恒生指数8000点保卫战（索罗斯攻打港币）。随后任职云南国际信托有限公司主力操盘手。参与多家私募风控操作。目前主攻大宗商品双向交易短线狙击，具有8年业内业绩较佳的实盘投资交易经验并肩经济基本面和技术。分析的功底，冷静客观的判断市场趋势。对量能系统结合大数据进行了深入的研究，总结出《斗转星移》AI交易系统。', '斗转星移');
INSERT INTO `live_jiangshi` VALUES ('5', ' 小李飞刀老师', '/room/images/js1.png', '理性投资、抓准最适宜点位、善于中长线布局', '2007年至今（10年以上）', '时间周期,MACD,布林带,均线,量能', '业内具有丰富经验的金融分析师，原东吴证券资深分析师，多次担任苏锡常地区电视\r\n与广播节目的特邀嘉宾。现为普林研究所资深分析师 。对证券、黄金、外汇有多年的实战操作经验，对环球财经分析具宏观视野，于投资理财具有独特的见解和理念，并从长期的实战中积累总结出很多简单实用的操作技巧。有过丰富的大资金操盘及成熟的技术指标操作，擅长股市和贵金属的波段把握。投资格言： 上善若水，顺势而为。记住一句话:市场永远是正确的。', '趋势为王');
INSERT INTO `live_jiangshi` VALUES ('6', '屠龙刀老师', '/room/images/js1.png', '顺势交易', ' 2007至今（10年实盘经验）', ' 多周期共振交易系统', '花名屠龙刀。从事金融行业多年，有着丰富的实战操盘经验，有超过10年股票交易经验，8年外汇市场交易经验，以及3年国内外期货市场及现货市场操盘经验，崇尚大道至简理念，化繁为简，持有期货投资分析师证书（全国通过率不足5%）。2010-2011年期间在美国华尔街著名的投资银行摩根斯坦利Morgan Stanley培训学习及封闭式交易训练，学习了国外先进的交易理念和交易模型。回国后，本人先后在多家公募基金，私募基金，外汇经纪商及期货公司担任首席分析师，首席策略师。2012年后逐步迈向资产管理领域，并有运作商品期货基金（CTA）的经验，担任基金经理。2013年后逐步开始研究程序化交易，编写策略代码，对策略的历史回测、评估有比较丰富的经验。本人擅长日内交易，自创多周期共振交易系统、K线量化交易策略及道氏理论。', '顺势交易');

-- ----------------------------
-- Table structure for live_kejian
-- ----------------------------
DROP TABLE IF EXISTS `live_kejian`;
CREATE TABLE `live_kejian` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `download` varchar(255) NOT NULL,
  `time` varchar(50) NOT NULL,
  `user` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_kejian
-- ----------------------------
INSERT INTO `live_kejian` VALUES ('8', '屠龙刀老师——成熟交易者的法则与心态', '交易应该是自然而且轻松的！不要强求任何事情，也不要和市场或者你自己作对。完美的交易是像呼吸一样的！你吸气和呼气，就像进场和出场。一定要冷静和放松，寻找那些可见的机会。一定要集中精神和警觉，把自己从水深火热的市场中抽离出来。一定要做一个观察者并且等待机会的降临。不要交易那些你无法弄懂的市场，也不要以为你必须每个波段都进行交易。总有许多的机会符合你的性格和你解读市场的能力。把握它们，忽视其他不适合你的机会。别痴心妄想可以做一个在任何市场进行交易的全能交易者。', '/uploads/20170512/a68a2e5f6902d2d4b903cb488ca36ed8.txt', '1494574062', '屠龙刀老师');
INSERT INTO `live_kejian` VALUES ('9', '风云老师——绝杀心魔', '2017风云携手，绝杀心魔（终级版） 一.亏钱的因素 二.遵循原则性 三.布局、思路的重要性 四.跟单的方式 亏钱的因素：', '/uploads/20170512/e0ab585514737f5e13fdb1b3ae32cef7.xlsx', '1494574093', '风云老师');

-- ----------------------------
-- Table structure for live_news
-- ----------------------------
DROP TABLE IF EXISTS `live_news`;
CREATE TABLE `live_news` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `download` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `time` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_news
-- ----------------------------
INSERT INTO `live_news` VALUES ('9', '德拉吉表示仍需维持宽松货币政策', ' FBI局长事件并未冲击市场，纳指五连涨创新高，希腊股市创1991年来最长连涨，油价涨3%创12月来最大日涨幅。 Snap业绩逊于预期，盘后股价暴跌23%至上市来新低。 德拉吉：仍需维持宽松货币政策，考虑QE退出的时间尚未到来。 美国对中国冷拔钢管启动“双反”调查。 海航增持德银背后：融资逾26亿欧元，包括买衍生品保护。 中国4月CPI重回“1时代”，PPI环比10个月来首次下降。 财新：比特币国内管理办法或于6月出台。 短暂企稳后股债双杀继续：A股午后放量杀跌，10年期国债收益率升至3.7%。 EIA原油库存降幅创五个月新高，美油重回47美元布油冲破50美元。', '', '诚亿财经', '1494569433');
INSERT INTO `live_news` VALUES ('10', '特朗普解雇FBI局长并未冲击市场 纳指连涨五日再创新高 油价大涨3%', '特朗普解雇FBI局长并未冲击市场，纳指连涨五日再创新高，油价大涨3%，创下去年12月来最大单日涨幅。 周二，美国总统特朗普突然宣布解雇FBI局长James Comey，这引来民主党和一些共和党人的批评。被解雇前，James Comey正着手调查特朗普竞选团队与俄罗斯之间的关系。美国总检察长Jeff Sessions表示，他建议解雇Comey，因其在处理希拉里邮件门调查中表现不利。 解雇Comey将伤害特朗普的政治资本，并弱化其与国会的关系。而目前，特朗普正希望推动一项雄心勃勃的促增长改革通过参议院和众议院。摩根大通表示，特朗普的税改、医改计划可能被大幅推迟。 虽然医改等事宜可能被推迟，但其仍然预计未来数周、数月特朗普政府将取得一定进展。', '', '诚亿财经', '1494569447');
INSERT INTO `live_news` VALUES ('3', '特朗普解雇FBI老大尚未冲击市场？但埋下了一颗巨型地雷！', ' 美国总统特朗普突然宣布解雇FBI局长科米（James Comey），这引来民主党和一些共和党人的批评。据白宫和美国司法部官员称，科米遭解职的原因是，他在调查时任国务卿希拉里（Hillary Clinton）用私人电邮处理公务一事上饱受批评。 虽然这一意外举动并未引发市场剧烈波动，但被认为加深了党派之间的分歧，将成为特朗普推动税改的一个障碍，甚至有民主党人士将科米被解职的严重性与导致尼克松总统下台的水门事件进行比较。不过，研究公司Strategas Research指出，解雇科米可能促使共和党人加速税改，以保持其在众议院的多数席位', '/uploads/20170512/4f4fab4e142c88c7ecb16d0d2d3bd61a.docx', '何静', '1494566452');
INSERT INTO `live_news` VALUES ('8', ' A股人均亏损8W以上', '此前，富瑞发表的全球资金流报告显示，截至5月3日的一周，股票基金录得36亿元美元净流出，主要是投资者开始沽售美股。而亚洲及中国股市继续获得投资者追捧，有4.69亿美元资金净买入中国股票基金，为连续7周净买入。 数据显示资金开始撤离美股部分转投亚洲股市，亚太股票互惠基金及交易所买卖基金（ETF）已连续17周获得净买入，最新一周的净买盘规模为28.17亿元。当中，中国内地股票基金及香港股票基金分别获得4.69亿及1亿元净买盘，后者已连续10星期录得净流入。 另外，今年是A股第四次冲关MSCI，6月即将揭晓结果。在经历前几次冲关失败之后，如今很多障碍已经清除，市场对这一次成功进入的期待很高，高盛认为成功概率高达70%，摩根士丹利认为概率有50%。', '', '诚亿财经', '1494569418');
INSERT INTO `live_news` VALUES ('7', ' 美联储9月加息概率也狂飙了 现在是重建美元多仓的好机会！', '债市投资者可能已经确认了美联储将要在6月加息的信息。从当前实际联邦资金利率和远期隔夜指数掉期利率来看，交易员判断美联储6月份加息的概率在80%左右。另外据外媒报道，他们也越来越相信美联储将在9月份再次加息，现在的预期概率为40%，大约是一周前的两倍。 周二，对加息预期反应最敏感的美国两年期国债收益率触及1.35%，是3月以来的最高点，而彭博美元指数也触及一个月高点。过去经验表明，前三次美联储加息前，债券市场收益率都在不断创造高点。 另外，美联储官员近来也频频为强劲的加息预期背书。美联储官员们上周表示，他们认为最近经济增长趋缓只是暂时现象，意味着最快下个月会继续加息。两天后公布的就业报告证明了他们的观点可信，失业率意外下降至4.4%，为2007年5月以来最低水平。同时，基于市场的通胀预期仍然接近美联储2%的目标。尽管从1月份高点下滑，但十年期美债平衡通胀率（breakeven rate）保持在1.86%，而在一年前为1.6%。', '', '诚亿财经', '1494569401');
INSERT INTO `live_news` VALUES ('11', ' 一个价值8.9万亿美元的问题：主要央行撤离债市会发生什么？', '央行一直是全球政府债券的最大买家，它们可能很快会转变成卖家，对全球市场来说这是一个重大转变。不过，这一转变将意味着什么，投资者看法不一。 部分问题在于，对于现行规模庞大的刺激政策（即量化宽松，简称QE）最初如何影响了债券走势，到现在仍没有定论。因此对上述转变将产生何种影响的评估尤为艰难。许多投资者称，预计未来债券收益率将攀升，股市将下跌。也有一些投资者认为，风险较高的投资（例如公司债或意大利国债）受到的冲击将最大。而某些债券也许根本不会受到影响。 2008年金融危机过后，发达国家央行普遍寻求通过买进债券来推低收益率，并驱动资金流入高风险资产，从而降低企业的借贷成本。最近公布的数据显示，欧洲央行持有总计4.5万亿美元资产，资产规模超过了其他任何一家银行。目前美联储和日本央行的资产规模均为4.4万亿美元。来自分析人士和央行的一系列研究估计，这些购债政策将英美10年期主权债券的收益率推低了约一个百分点，使欧元区主权债券的收益率降低了0.5个百分点，但产生这种结果的原因尚不清楚。', '', '诚亿财经', '1494569463');
INSERT INTO `live_news` VALUES ('12', '沙特又来解局了？下个月或削减对亚洲原油供应', '周一，在消息人士称欧佩克与非欧佩克的联合减产行动或延长9个月或更长时间之后，油市多头信心得到支撑，油价在上周急跌后小幅反弹，不过油市的下行趋势依旧十分明显。周二晚间，受利比亚大型油田恢复生产导致该国产量增至79.2万桶/日的消息影响，WTI原油再度跌破46美元/桶，跌幅逾1%；布油跌破49美元/桶关口，日内跌幅1.2%。 为了支撑油价反弹，沙特除了积极减产以外，还可能采取更多实际行动拯救油市。周二，据路透援引消息人士报道称，今年6月，沙特阿美销往亚洲的原油将减少约700万桶，其中对东南亚、中国和韩国的供应量均将减少100万桶，对印度和日本削减的供应量将分别为略高于300万桶和略低于100万桶。自今年1月正式实施减产以来，沙特一直积极遵守减产协议。根据欧佩克和俄罗斯等非欧佩克产油国在去年12月达成为期六个月的联合减产协议，约定合计减产约180万桶/日。其中，沙特承诺的减产量约占欧佩克承诺减产规模的40%，截止目前沙特已减少50多万桶/日，日产量不足1000万桶，超额按成目标。', '', '诚亿财经', '1494569477');
INSERT INTO `live_news` VALUES ('13', '指标交易不一定是好的选择', ' 简言之，国内的金融去杠杆令资产泡沫显露无遗。在此背景之下，投资者不禁会问：金融资产与经济趋势之间的传统相关性还存在吗？彭博宏观策略师克莱斯（Cameron Crise）就是从这一个出发点指出，“铜博士”应该为“玩忽职守”而受到指责。 克莱斯称，交易员喜欢研究叠加图来帮助他们发现经济与市场变量之间的分歧。然而，过度依赖这种简单的探索性论据有很大的风险，尤其是当其中一个变量作为衡量指标出现偏差的时候。 宏观交易的一大主题就是比较叠加图里不同的指标，寻找差异从而发掘投资机会。隐含在这种技术背后的，当然是交易员对自身辨别自变量和因变量能力的信心。这种叠加图的一个很好的例子就是美国10年期国债收益率和金铜比的对比。从两者最近几个月的相关性来看，美债收益率似乎应该还会降低20个基点左右。', '', '诚亿财经', '1494569493');
INSERT INTO `live_news` VALUES ('14', '韩国共同民主党候选人文在寅取得大选胜利', '标普道指尾盘跳水，黄金跌幅收窄，韩元兑日元下挫，此前朝鲜驻英国大使称择时进行第六次核试验。 纳指新高，欧股气势如虹德股创新高，阿里收120美元创新高，比特币突破1700美元。 英伟达财报超预期，盘后股价暴涨14%。 韩国共同民主党候选人文在寅取得大选胜利。 媒体：证监会要求券商资金池大集合产品整改而非清理，仍可滚动发行。 央行工作论文：应高度重视非银机构对金融稳定的影响。 沪指结束五连跌，港股收创21个月新高。 保监会整治险资运用风险：实施穿透式检查，严控增量风险。 “最差第一季度”后，乘用车市场4月份销量再现负增长。', '', '诚亿财经', '1494569509');
INSERT INTO `live_news` VALUES ('15', '又有三位联储官员支持年内共加息三次 称今年应开始缩表', '美联储官员公开发表意见的次数自1990年代中期以来显著增长，今年更是预计将创下讲话的次数记录，平均每位地区联储主席将发表14次公开讲话。 而从上周三的美联储5月FOMC议息会议以来，包括美联储主席耶伦、副主席费舍尔在内的近10位联储官员都相继发声，地区联储主席不约而同地支持今年开始缩表。大多数联储官员都强调应遵照既定的加息路径，即今年共加息3次，若少于这个次数担心造成经济过热的风险。 2017年FOMC票委、美国达拉斯联储主席Robert Kaplan表示，美国已经接近于充分就业，基本观点是美联储今年共加息3次，但前提是经济增速适中。若经济增速快于预期，加息次数将增加；若逊于预期将缩减加息次数，都符合他的一贯主张 一向以鹰派著称的美国联储堪萨斯城联储主席Esther George（无投票权）警告称，美国经济有过热风险，今年应坚持循序加息的路径，并开始缩表。', '', '诚亿财经', '1494569523');
INSERT INTO `live_news` VALUES ('16', ' 韩国大选仍存', '去年底的美国大选，在民调大多看好希拉里的情况下，最终登上总统宝座的却是特朗普，这一度让“大选民调失准”成为热门话题。不过，今年在荷兰和法国已经结束的大选中，面对欧洲右翼的崛起，民调数据“力挺”的候选人都最终获胜，为民调挽回了“颜面”。 紧接着，韩国第19届总统选举也已于9日06:00（北京时间05:00）开始投票，截止时间为当天20:00。韩联社8日报道称，大选结果预计于当日23时许轮廓初现，开票率达到70-80%的10日凌晨2时至3时基本可以确定。韩国中央选举管理委员会7日表示，本次大选的开票工作预计在10日上午6时至7时结束，计划于8时至10时召开全体会议宣布新当选总统。 5月3日起，韩国便禁止公布大选民意调查，最后一份民意调查显示了韩国大选1强（文在寅）、2中（洪准杓、安哲秀）、2弱（刘承旼、沈相奵）的格局。韩国《民族日报》8日报道，从1987年后举行的六次韩国大选来看，最后一次舆论调查的支持率排名从未在开票时被推翻。这一次，民调数据看好的共同民主党候选人文在寅能否一举赢得大选？', '', '诚亿财经', '1494919768');

-- ----------------------------
-- Table structure for live_notice
-- ----------------------------
DROP TABLE IF EXISTS `live_notice`;
CREATE TABLE `live_notice` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_notice
-- ----------------------------
INSERT INTO `live_notice` VALUES ('1', '5月9日盈利回顾：直播室麦上麦下13单盈利，战神老师青商生物燃料多空双杀获利止盈210点！辽贵银、工业银板多空双杀获利止盈93点！辽河油、工业沥青多空双杀获利盈利230点！青商铜、金普铜空单获利止盈2100点！恭喜跟上直播室老师做单止盈的朋友，恭喜发财！咨询下方【高级助理】免费领取本周【各大品种周布局】以及预约申请22:30的【eia布局策略】！');

-- ----------------------------
-- Table structure for live_robot
-- ----------------------------
DROP TABLE IF EXISTS `live_robot`;
CREATE TABLE `live_robot` (
  `robot_id` int(10) NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(255) NOT NULL,
  `level` tinyint(2) NOT NULL,
  `uid` int(10) NOT NULL,
  PRIMARY KEY (`robot_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_robot
-- ----------------------------
INSERT INTO `live_robot` VALUES ('10', '小小的人儿', '4', '29');
INSERT INTO `live_robot` VALUES ('12', '你从哪里来？', '4', '32');
INSERT INTO `live_robot` VALUES ('13', '哼', '8', '53');
INSERT INTO `live_robot` VALUES ('14', '哼哼', '7', '53');

-- ----------------------------
-- Table structure for live_role
-- ----------------------------
DROP TABLE IF EXISTS `live_role`;
CREATE TABLE `live_role` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `level_name` varchar(255) NOT NULL,
  `level` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_role
-- ----------------------------
INSERT INTO `live_role` VALUES ('1', '会员', '1');
INSERT INTO `live_role` VALUES ('2', '白银', '2');
INSERT INTO `live_role` VALUES ('3', '铂金', '3');
INSERT INTO `live_role` VALUES ('4', '钻石', '4');
INSERT INTO `live_role` VALUES ('5', '大亨', '5');
INSERT INTO `live_role` VALUES ('6', '国王', '6');
INSERT INTO `live_role` VALUES ('7', '分析师', '7');
INSERT INTO `live_role` VALUES ('8', '管理员', '8');

-- ----------------------------
-- Table structure for live_room
-- ----------------------------
DROP TABLE IF EXISTS `live_room`;
CREATE TABLE `live_room` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) NOT NULL,
  `room_title` varchar(255) NOT NULL,
  `room_keyword` varchar(255) NOT NULL,
  `room_logo` varchar(255) NOT NULL,
  `room_notice` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_room
-- ----------------------------
INSERT INTO `live_room` VALUES ('1', '我的直播室', '还是我的直播室', '又是我的直播室', '/room/images/logo.png', '5月9日盈利回顾：直播室麦上麦下13单盈利，战神老师青商生物燃料多空双杀获利止盈210点！辽贵银、工业银板多空双杀获利止盈93点！辽河油、工业沥青多空双杀获利盈利230点！青商铜、金普铜空单获利止盈2100点！恭喜跟上直播室老师做单止盈的朋友，恭喜发财！咨询下方【高级助理】免费领取本周【各大品种周布局】以及预约申请22:30的【eia布局策略】！');

-- ----------------------------
-- Table structure for live_service
-- ----------------------------
DROP TABLE IF EXISTS `live_service`;
CREATE TABLE `live_service` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `group` tinyint(1) NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_service
-- ----------------------------
INSERT INTO `live_service` VALUES ('1', '1', '3002911972*3002918612*3002941885*3002971532*3002968734*3002975261*3002976500*3002978531*3002978837*3002996806', '1');
INSERT INTO `live_service` VALUES ('2', '2', '804755564*4324322', '0');

-- ----------------------------
-- Table structure for live_user
-- ----------------------------
DROP TABLE IF EXISTS `live_user`;
CREATE TABLE `live_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(40) NOT NULL,
  `icon` varchar(255) NOT NULL COMMENT '头像',
  `sex` tinyint(1) NOT NULL COMMENT '0男 1女',
  `phone` varchar(11) NOT NULL,
  `level` tinyint(1) NOT NULL COMMENT '角色等级',
  `kefu` tinyint(1) NOT NULL COMMENT '是否是客服',
  `qq` varchar(20) NOT NULL,
  `login_status` tinyint(1) NOT NULL,
  `register_time` varchar(50) NOT NULL,
  `login_ip` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of live_user
-- ----------------------------
INSERT INTO `live_user` VALUES ('32', '哈哈啊啊啊', '9220a98a92fe2f89199fb6f8f8e73166', '/room/images/header_sculpture.png', '1', '18621197513', '8', '0', '514499610', '1', '1494815613', '127.0.0.1');
INSERT INTO `live_user` VALUES ('53', '哎呀妈呀', '3da6cf345f8717d64c8ae3efd2a15c58', '/room/images/header_sculpture.png', '0', '18621197512', '6', '0', '', '1', '1494815613', '127.0.0.1');
