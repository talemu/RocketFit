

from ast import Dict
import datetime
from RFApp.dtos.ExerciseDTO import ExerciseDTO

from RFApp.dtos.ExerciseRecordDTO import ExerciseRecordDTO
from RFApp.dtos.RFAuthUserDTO import RfAuthUserDTO
from RFApp.dtos.WorkoutExerciseDTO import WorkoutExerciseDTO
from RFApp.dtos.WorkoutTemplateDTO import WorkoutTemplateDTO
from RFApp.dtos.MotivationalQuoteDTO import MotivationalQuoteDTO


class TransformRequestMapper:
    @staticmethod
    def to_er_dto(json_dict : Dict):
        """
        Converts a JSON dictionary (from the API request body) to an ExerciseRecordDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            ExerciseRecordDTO: The converted ExerciseRecordDTO object.
        """
        try:
            return ExerciseRecordDTO(
                exerciseName = json_dict['exerciseName'],
                sets = json_dict['sets'],
                reps = json_dict['reps'],
                weight = json_dict['weight'],
                authId = json_dict['authId'],
                day = json_dict['day'],
                workoutNumber = json_dict['workoutNumber'],
                targetWeight = json_dict['targetWeight'],
                createdDate = datetime.datetime.now()
            )
        except Exception as e:
            raise Exception("Request Mapper Issue: " + e.args[0])
    
    @staticmethod
    def to_e_dto(json_dict : Dict):
        """
        Converts a JSON dictionary (from the API request body) to an ExerciseDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            ExerciseDTO: The converted ExerciseDTO object.
        """
        try:
            return ExerciseDTO(
                exerciseName = json_dict['exerciseName']
            )
        except Exception as e:
            raise Exception("Request Mapper Issue: " + e.args[0])
    
    @staticmethod
    def to_rfau_dto(json_dict : Dict):
        """
        Converts a JSON dictionary (from the API request body) to an RfAuthUserDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            RfAuthUserDTO: The converted RfAuthUserDTO object.
        """
        try:
            return RfAuthUserDTO(
                username = json_dict['username'],
                emailAddress = json_dict['emailAddress'],
                password = json_dict['password']
            )
        except Exception as e:
            raise Exception("Request Mapper Issue: " + e.args[0])
    
    @staticmethod
    def to_we_dto(json_dict: Dict):
        """
        Converts a JSON dictionary (from the API request body) to a WorkoutExerciseDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            WorkoutExerciseDTO: The converted WorkoutExerciseDTO object.
        """
        try:
            return WorkoutExerciseDTO(
                days = json_dict["days"],
                exercises = json_dict["exercises"],
                sets = json_dict["sets"],
                reps = json_dict["reps"],
                rest = json_dict["rest"],
                weeks = json_dict["weeks"],
                authid = json_dict["authid"],
                workoutNumber = json_dict["workoutNumber"],
                workoutName = json_dict["workoutName"]
            )
        except Exception as e:
            raise Exception("Request Mapper Issue: " + e.args[0])
    
    @staticmethod
    def to_wt_dto(json_dict: Dict):
        """
        Converts a JSON dictionary (from the API request body) to a WorkoutTemplateDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            WorkoutTemplateDTO: The converted WorkoutTemplateDTO object.
        """
        try:
            return WorkoutTemplateDTO(
                workoutName = json_dict['workoutName'],
                exercises = json_dict['exercises'],
                sets = json_dict['sets'],
                reps = json_dict['reps'],
                rest = json_dict['rest'],
                days = json_dict['days'],
                weeks= json_dict['weeks']
            )
        except Exception as e:
            raise Exception("Request Mapper Issue: " + e.args[0])
        
    @staticmethod
    def to_mq_dto(json_dict: Dict):
        """
        Converts a JSON dictionary (from the API request body) to a MotivationalQuoteDTO object.

        Args:
            json_dict (Dict): The JSON dictionary containing the data.

        Returns:
            MotivationalQuoteDTO: The converted MotivationalQuoteDTO object.
        """
        try:
            return MotivationalQuoteDTO(
                quote = json_dict['quote'],
                author = json_dict['author']
            )
        except Exception as e:
            raise Exception("Request Mapper Issue: " + e.args[0])