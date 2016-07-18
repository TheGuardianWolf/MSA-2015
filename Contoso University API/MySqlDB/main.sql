-- phpMyAdmin SQL Dump
-- version 4.4.13.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Nov 23, 2015 at 11:50 PM
-- Server version: 5.6.26
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `universitycontoso`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE IF NOT EXISTS `assignment` (
  `ID` int(11) NOT NULL,
  `CourseID` longtext,
  `CompletionDate` datetime NOT NULL,
  `Weighting` int(11) NOT NULL,
  `MaxMark` int(11) NOT NULL,
  `Course_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `assignmentfile`
--

CREATE TABLE IF NOT EXISTS `assignmentfile` (
  `ID` int(11) NOT NULL,
  `StudentID` int(11) NOT NULL,
  `AssignmentID` int(11) NOT NULL,
  `Link` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE IF NOT EXISTS `course` (
  `ID` int(11) NOT NULL,
  `CourseName` longtext,
  `Credits` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`ID`, `CourseName`, `Credits`) VALUES
(1, 'Science', 0);

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE IF NOT EXISTS `enrollment` (
  `ID` int(11) NOT NULL,
  `CourseID` int(11) NOT NULL,
  `StudentID` int(11) NOT NULL,
  `Test` longtext,
  `Assignment` longtext,
  `Grade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `ID` int(11) NOT NULL,
  `FirstName` longtext,
  `LastName` longtext,
  `EnrollmentDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `ID` int(11) NOT NULL,
  `CourseID` longtext,
  `CompletionDate` datetime NOT NULL,
  `Weighting` int(11) NOT NULL,
  `MaxMark` int(11) NOT NULL,
  `Course_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE IF NOT EXISTS `todo` (
  `ID` int(11) NOT NULL,
  `StudentID` int(11) NOT NULL,
  `Description` longtext,
  `Complete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `__migrationhistory`
--

CREATE TABLE IF NOT EXISTS `__migrationhistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ContextKey` varchar(300) NOT NULL,
  `Model` longblob NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `__migrationhistory`
--

INSERT INTO `__migrationhistory` (`MigrationId`, `ContextKey`, `Model`, `ProductVersion`) VALUES
('201511240658353_AutomaticMigration', 'ContosoApi.Models.ContosoApiContext+MyConfig', 0x1f8b0800000000000400ed5d5f6fdcb8117f2fd0ef20e8b1c8edda495b5c8ddd3b38767c301ac741d6b9f6cda0257a2d447fb69236b051f493dd433f52bf4249fda1287248919256bbf61979594be47038fccd7066c851fef7db7f173f3f46a1f31da75990c44bf77876e43a38f6123f88d74b779bdffff0a3fbf34f7ffcc3e2831f3d3abfd6edded176a4679c2ddd873cdf9ccce799f7802394cda2c04b932cb9cf675e12cd919fccdf1e1dfd6d7e7c3cc784844b6839cee2cb36ce8308177f903fcf92d8c39b7c8bc2abc4c761563d276f560555e7138a70b6411e5ebaa46d4ee89f6e8259d9d8754ec30011465638bc771d14c7498e72c2e6c9d70caff23489d7ab0d7980c29ba70d26edee5198e18afd93a6b9e94c8eded299cc9b8e35296f9be5496449f0f85d259ab9d8bd97805d263a22bc0f44c8f9139d7521c0a57b9a65c13a8e709c5f0421118138e4c95998d2e6809467edbe6f9ca6c51b860b021ffa8fbcdc86f936c5cb186ff314856f9ccfdbbb30f0fe8e9f6e926f385ec6db30e45925cc9277ad07e4d1e734d9e0347ffa82efab095c9ebbcebcdd6f2e7664ddb83ee5a42ee3fcdd5bd7f944064777216648e004b0ca9314ff82639ca21cfb9f519ee3942ce4a58f0b594aa30b63adf22d6dd93da49e4c23eba1943e06f1b79a02d105a2d5ae73851e3fe2789d3f2c5df2d3752e8247ecd74f2aaa5fe3801801d2294fb7f2209fd0f7605d084cc9b8eb7cc161d1247b0836a5727218ba15a1789126d197246cd1101adddea0748d09e59ba4abe52ad9a69e05dfd5ba814c57ef341cc32d247615cd205e17f346770d35baaf36bf6a3238d61959950c37238ea73cd240d126c494e573c2683d1cfd7d4376486b85ff070ed60f79c1ea10bb41e67685d26f96440cec42a93be3db865a8bba6d43ad96a6bc974800792e5f7103643cb3f25bc924004d0699839a571b5350f67935031a33407fefde10a4d80f2882c656b96c1cec8a1aa681b7298f1fe2340943358fcdfbdb1ad90d8bd24b49bbe416b67ec10dce14acd1370053dc63891dfedd202d6fe665a7e94dbf576dd768fb509f7ba42080c265e74687f71f773cd42f29f21b2b4a75a87a32c2466c69284453a636256306102d6b27470fdc6b65e8c0b719644218bf36f6a3eaf43b331e9f92b813db17419ae59378091fd144033550eb17970c89057a87dca2627744e663f9293d345cc52964058cbd95e43c819d15f2e296a93ce7ad70cf6577857f39c8d8947cd9581adae3776666264e319ee3cc4b834d99689e26c5c18cc8fb84000cc5036c886ebb3502bba87ea026f4037be1b659819df47805bb0239af59b8f1b2701a07da209c9554060875cd34661b71fa52050197d94588d6cde99c8d021524c6d02082191fa7e11359385ee26df15ee1e80ea7b533e33abfa2704b7e1d49ebd06af89e353cd6373c630ddfea1b9eb386eff40d2f58c33fcb2b54ae05ff90f84a89171442973c36d1236b8ffa21f61de33c6d1306f231e81559a66043168600878a4a3461d7f139a65b8973ea9547ac6728f3a028924ccdb7e78ef9401077a50fdae6f04fd2c0c4b8e2945a3714124066046c419ccb963888bd608342537909040c8d3995031b4a7c738e3738a676d8542a263cb44f2e656ed8a0c26a75496d31e760a9472b90d854014197e56c10509bc5f6ca1fcd66b2266b496bc1d5012c8bf9cbb910158f9ac448c3229f6cecc2be8e34307b58b0a32a7d2f6d54323f81162ad7c464ecc65dda8be629c2761546ba62f80628cc9b9f647be83ace9f786fd08b690248eae561c20017b3ee15987c7ea66bf5c164cdbe2109e688fbd9ea4158048433211001293c0714b61213aa9586b314cd1297b934f38d184ef14d8be35e5083189f006390fc9f05b8b8005e8905289ae7a05564ae2ca0059d75dbbbcdca4996e9031ad513b134f1318bf2e92ffc0825dbbe66b84a176455fa479c03a5bcc239782491b94e93b950ecf492505404f5c43a0995428488d4e2ed20d03a929088f01b4607a10ae0101566433a4850dd02e7521ab5aedee55d0cb973015ba13307296855a49325ae7de77d3451bd6dd21e6c520246249b6193ad00895648168d735b30064283ee09c9d2ea0aba4dc36e6e2a0cfa1ad968a26c3349f7100870d740964747106e1886737368e9b14622eac0bb5bb43d84a13aa9952562121cda8487dc741ad3a4114c4754b7531d02cf87d522528629c6814a5fe140f18519087b48a57d50278b43ed2f777bcc1cd3f5aea3993ee8241bc8b0cfa4f9831660ce2a37aed391e3675cee94ba0903aedb20fb501ff6306f8dbd5bcccb1aaeeac162ae28f65a5ca1cd2688d75cf157f5c45955955f3facec6ba2a292c6dc6ba992e85bb291f224456b2cbca502f17171c7e71ce5e80ed1b53bf323a099e89b2a5c9a7a3cd8fd94d7ad7679ea7ef4b7e80ec3855a40f05211b92033a5ad8a4963a5fd930938b42c0f8528050e86cf92701bc5ea484cdd9b0ba078229ab84a4dab7d0ac193d39f4fa8299675543ca5f2894c613117e42b4583d2724af1731b2596181a0f3f83b033156e9a9c374f439d09d7516adf0168d36bbf33a7ca5d05e009728fcd69b1fb003c25f6f060b0586f1fc37008ef8206185475dc25feca2b993202cbe716d4ea229016a9fae1c1acb0de43b559652e0361bfd2bace876e6dc6dcefca14084f064a8ae828f0292978bfb4a156dde9e1098177fd4b04ee05c1cca51f065f457862805d65cfdd0097bba1ce13e11e5b38430822d53c35a7245e32e7e989ef0e063a5540390c3845cad31e3570b7c3f7c85bd78d796aad17d6be1aeca51d14588a587c2056a831ef8115b0dba1ef8baf5eb82df2da4919c8156f67efbb9dee767bf3188f6698406040b97e594e46b8ac08c207addcf8bd58539e33f756192d4f44fec4b1a787b89719bdd5cd6e3f1b4d584cc75983a3958bec3240aca1899901a40da41cf78e00208ffa52965e4ac88a4d98556289592101bba892a1269fe412b2a36513d72193ff1ef834337af5b4fa5738a3ef67c5cfb33028628abac5158a837bb21ae5657cf72fb3bf0a9ff53a9c4f6ccdb3cc0f8164b2fa3b5beda59ba03027a0a2ed2cbd195ad61e80f5c397b18f1f97eebf8b5e27cee53f6f59c737ce754ad6fac43972fe33ca37b14c39e0fb0e6282ff9c5698c4ebf2fe4943442e35eaf325a7978117b176cb4c5e101da834cb27bff3a234eb738abda0fc2ce1d1f042ad4214c3cab4fa90e02cbd1db4594715ae074012bc4ef6bce15826280602b2fda19eeee5eef361979724f4bea81e68acf7bc61f1df6fe90b35f9f32c7d29b5bebe224076808980af334f0557cb1591bed2d15798e24738fad281bfb1d16b6bb3fb18c3cbb02e7b5670e0130a037d1c0681bb2409475b70293e7fb60bfeea523e339772dc5af243a91a2fafb8eeaf467cda6a70c52db29751fb3dbcd0db1a9e23c141793d668750b0284256a46727c08079fdbb3104766451f8ea9b29ab38a7838ef676cf0ba95fdf6359f0beb724f5ed9743d88ff65d92d9a3ea7c8f58da97319a104396d668dff831aa17df3f70cae24deb12f543078be282d601c2c4a0f27b2c67b7f54d6af39af103f75214f7abf6edda0a07f88c07b114495c2c5d6dbb41697b7978bf74fd3baad665c4dfbbfcbda3fa5d3f966175bca6381ea26f5d38df51370f8d615f57af2bab8746b0a9b95756dc43848d6bf195a5f820d5432cd25754fd1a56e3f3ea04d5cd1d70e93d50ec69386943911d42597dbfa9ca6a2f569a3c87a279a87af96060bdcb6a78eb894fb1de2315baf79d22bf053445040752cade4f4bf9fda7b984ba937275f9162471e9b8ffbe947893543f18097ab333c65ecb99636d2ee3fba4762b058eea26e24110ce914f3cbdd3340fee919793d71e261a498f97aaaffa7e88eeb07f195f6ff3cd362753c6d15dd8fab236f54d75e31735f96d9e17d7c5b96636c614089b013d5bbb8edf6f83d0677c5f00879a0a12d4e9adce11e95ae6f43c71fdc428c9ff45878a50253ee6abdfe068131262d975bc42df711fdebe66f8235e23efa9becbaa26d2bd106db12fce03b44e519455349afee44f82613f7afce9ff6e855f0ac5770000, '6.1.3-40302');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IX_Course_ID` (`Course_ID`) USING HASH;

--
-- Indexes for table `assignmentfile`
--
ALTER TABLE `assignmentfile`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IX_StudentID` (`StudentID`) USING HASH,
  ADD KEY `IX_AssignmentID` (`AssignmentID`) USING HASH;

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IX_CourseID` (`CourseID`) USING HASH,
  ADD KEY `IX_StudentID` (`StudentID`) USING HASH;

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IX_Course_ID` (`Course_ID`) USING HASH;

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IX_StudentID` (`StudentID`) USING HASH;

--
-- Indexes for table `__migrationhistory`
--
ALTER TABLE `__migrationhistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `assignmentfile`
--
ALTER TABLE `assignmentfile`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `FK_Assignment_Course_Course_ID` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`ID`);

--
-- Constraints for table `assignmentfile`
--
ALTER TABLE `assignmentfile`
  ADD CONSTRAINT `FK_AssignmentFile_Assignment_AssignmentID` FOREIGN KEY (`AssignmentID`) REFERENCES `assignment` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_AssignmentFile_Student_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `FK_Enrollment_Course_CourseID` FOREIGN KEY (`CourseID`) REFERENCES `course` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Enrollment_Student_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `FK_Test_Course_Course_ID` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`ID`);

--
-- Constraints for table `todo`
--
ALTER TABLE `todo`
  ADD CONSTRAINT `FK_ToDo_Student_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
